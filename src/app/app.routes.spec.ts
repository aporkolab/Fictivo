import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';
import { ContactComponent } from './page/contact/contact.component';
import { FictivoComponent } from './page/fictivo/fictivo.component';
import { HomeComponent } from './page/home/home.component';

describe('app routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideHttpClient(), provideHttpClientTesting()],
    });
    harness = await RouterTestingHarness.create();
  });

  it('maps every page to its component', async () => {
    expect(await harness.navigateByUrl('/', HomeComponent)).toBeInstanceOf(HomeComponent);
    expect(await harness.navigateByUrl('/fictivo', FictivoComponent)).toBeInstanceOf(FictivoComponent);
    expect(await harness.navigateByUrl('/contact', ContactComponent)).toBeInstanceOf(ContactComponent);
  });

  it('redirects unknown urls to the home page', async () => {
    expect(await harness.navigateByUrl('/does-not-exist', HomeComponent)).toBeInstanceOf(HomeComponent);
  });
});
