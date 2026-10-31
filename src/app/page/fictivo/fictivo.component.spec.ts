import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Rank } from '../../model/rank';
import { NotificationService } from '../../service/notification.service';
import { FictivoComponent } from './fictivo.component';

const RANKS: Partial<Rank>[] = [
  { domain: 'military', nameFragment: 'Captain', inHungarian: 'százados', shortFormHUN: 'szds.', shortFormENG: 'Cpt.' },
  { domain: 'civilian', nameFragment: 'Baker', inHungarian: 'pék' },
];

describe('FictivoComponent', () => {
  let component: FictivoComponent;
  let fixture: ComponentFixture<FictivoComponent>;
  let http: HttpTestingController;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FictivoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FictivoComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  function fillForm(rank: 'civilian' | 'military', nameElements: '1' | '2' = '2'): void {
    component.form.setValue({ language: 'hungarian', numberOfNames: 2, gender: 'male', nameElements, rank });
    fixture.detectChanges();
  }

  function flushNames(): void {
    http.expectOne('assets/names/hungarian/male.names').flush('hu\nmale\nÁdám\n');
    http.expectOne('assets/names/hungarian/sur.names').flush('hu\nany\nKovács\n');
    http.expectOne('assets/names/ranks.json').flush(RANKS);
    fixture.detectChanges();
  }

  const button = () => element.querySelector<HTMLButtonElement>('button[type="submit"]');
  const results = () => Array.from(element.querySelectorAll('.tm-article .tm-article-title-1')).map(e => e.textContent!.replace(/\s+/g, ' ').trim());

  it('offers every language and profession', () => {
    expect(element.querySelectorAll('#selectedLanguage option').length).toBe(component.languages.length + 1);
    expect(element.querySelectorAll('#rank option').length).toBe(component.rankOptions.length + 1);
  });

  it('shows the generate button only for a complete and valid form', () => {
    expect(button()).toBeNull();

    fillForm('civilian');
    expect(button()).not.toBeNull();

    component.form.controls.numberOfNames.setValue(11);
    fixture.detectChanges();
    expect(button()).toBeNull();
  });

  it('renders the rank after the name for civilian professions', () => {
    fillForm('civilian');
    button()!.click();
    flushNames();

    expect(results()).toEqual(['Ádám Kovács Baker', 'Ádám Kovács Baker']);
  });

  it('renders the rank before the name for military ranks', () => {
    fillForm('military');
    button()!.click();
    flushNames();

    expect(results()).toEqual(['Captain Ádám Kovács', 'Captain Ádám Kovács']);
  });

  it('keeps the result layout when the profession changes after generation', () => {
    fillForm('military');
    button()!.click();
    flushNames();

    component.form.controls.rank.setValue('civilian');
    fixture.detectChanges();
    expect(results()).toEqual(['Captain Ádám Kovács', 'Captain Ádám Kovács']);
  });

  it('notifies the user when the name lists cannot be loaded', () => {
    const showError = vi.spyOn(TestBed.inject(NotificationService), 'showError').mockImplementation(() => undefined);
    fillForm('civilian');
    button()!.click();

    http.expectOne('assets/names/hungarian/male.names').flush('nope', { status: 404, statusText: 'Not Found' });
    expect(http.expectOne('assets/names/hungarian/sur.names').cancelled).toBe(true);
    // the shared rank list download keeps running so the next attempt can reuse it
    http.expectOne('assets/names/ranks.json').flush(RANKS);
    fixture.detectChanges();

    expect(showError).toHaveBeenCalled();
    expect(results()).toEqual([]);
    expect(component.loading()).toBe(false);
  });
});
