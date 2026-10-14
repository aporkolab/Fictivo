import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { FictivoComponent } from './fictivo.component';

describe('FictivoComponent', () => {
  let component: FictivoComponent;
  let fixture: ComponentFixture<FictivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ FictivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FictivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
