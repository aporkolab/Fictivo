import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeadbarComponent } from './common/headbar/headbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeadbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'fictivo';
}
