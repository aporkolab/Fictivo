import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { GeneratedName } from '../../model/generated-name';
import { Gender, LANGUAGES, Language, MAX_NAMES, RANK_OPTIONS, RankCategory, RankPosition } from '../../model/name-options';
import { NameGenerateService, generateNames } from '../../service/name-generate.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-fictivo',
  imports: [ReactiveFormsModule],
  templateUrl: './fictivo.component.html',
  styleUrls: ['./fictivo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FictivoComponent {
  private readonly nameGenerator = inject(NameGenerateService);
  private readonly notification = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly languages = LANGUAGES;
  readonly rankOptions = RANK_OPTIONS;
  readonly maxNames = MAX_NAMES;

  readonly form = new FormGroup({
    language: new FormControl<Language | ''>('', { nonNullable: true, validators: Validators.required }),
    numberOfNames: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(MAX_NAMES)]),
    gender: new FormControl<Gender | ''>('', { nonNullable: true, validators: Validators.required }),
    nameElements: new FormControl<'1' | '2' | ''>('', { nonNullable: true, validators: Validators.required }),
    rank: new FormControl<RankCategory | ''>('', { nonNullable: true, validators: Validators.required }),
  });

  readonly resultNames = signal<GeneratedName[]>([]);
  readonly rankPosition = signal<RankPosition>('suffix');
  readonly loading = signal(false);

  generateNames(): void {
    const { language, numberOfNames, gender, nameElements, rank } = this.form.getRawValue();
    if (this.form.invalid || !language || !gender || !rank || numberOfNames === null) {
      return;
    }

    this.loading.set(true);
    this.nameGenerator.loadSources(language, gender).pipe(
      finalize(() => this.loading.set(false)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: sources => {
        this.rankPosition.set(RANK_OPTIONS.find(option => option.value === rank)?.position ?? 'suffix');
        this.resultNames.set(generateNames(sources, { rank, count: numberOfNames, nameElements: Number(nameElements) }));
      },
      error: () => {
        this.resultNames.set([]);
        this.notification.showError('The name lists could not be loaded. Please try again later.', 'Generation failed');
      },
    });
  }
}
