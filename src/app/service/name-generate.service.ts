import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, shareReplay, throwError } from 'rxjs';

import { GeneratedName } from '../model/generated-name';
import { Gender, LANGUAGES, Language, RankCategory } from '../model/name-options';
import { Rank } from '../model/rank';

export interface NameSources {
  givenNames: string[];
  surnames: string[];
  ranks: Rank[];
}

export interface GenerateOptions {
  rank: RankCategory;
  count: number;
  /** 1 = a single (artist-style) name element, 2 = given name + surname. */
  nameElements: number;
}

const NAMES_BASE_URL = 'assets/names';

/** Enlisted ranks that do not exist in the Hungarian police and fire service rank systems. */
const ENLISTED_ONLY_HU = ['közkatona', 'őrvezető', 'tizedes', 'szakaszvezető'];

/**
 * Parses a `.names` file: the first two lines are a header (country code and gender),
 * the rest is one name per line.
 */
export function parseNameList(text: string): string[] {
  return text
    .split(/\r?\n/)
    .slice(2)
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

export function selectRanks(ranks: readonly Rank[], category: RankCategory): string[] {
  const inDomain = (domain: string) => ranks.filter(item => item.domain === domain);
  const officers = () => inDomain('military').filter(item => !ENLISTED_ONLY_HU.includes(item.inHungarian));

  switch (category) {
    case 'education':
    case 'military':
    case 'SS-military':
    case 'civilian':
      return inDomain(category).map(item => item.nameFragment);
    case 'HUN-education':
      return inDomain('education').map(item => item.inHungarian);
    case 'military-abb':
      return inDomain('military').map(item => item.shortFormENG);
    case 'HUN-military':
      return inDomain('military').map(item => item.inHungarian);
    case 'HUN-military-abb':
      return inDomain('military').map(item => item.shortFormHUN);
    case 'HUN-police':
      return officers().map(item => 'r. ' + item.inHungarian);
    case 'HUN-police-abb':
      return officers().map(item => 'r. ' + item.shortFormHUN);
    case 'HUN-fireman':
      return officers().map(item => 'tű. ' + item.inHungarian);
    case 'HUN-fireman-abb':
      return officers().map(item => 'tű. ' + item.shortFormHUN);
    case 'HUN-civilian':
      return inDomain('civilian').map(item => item.inHungarian);
    case 'artist':
      return [];
  }
}

function pick<T>(items: readonly T[], random: () => number): T | undefined {
  return items.length ? items[Math.floor(random() * items.length)] : undefined;
}

export function generateNames(
  sources: NameSources,
  options: GenerateOptions,
  random: () => number = Math.random,
): GeneratedName[] {
  const ranks = selectRanks(sources.ranks, options.rank);
  const result: GeneratedName[] = [];

  for (let i = 0; i < options.count; i++) {
    const rank = pick(ranks, random);
    if (options.nameElements > 1) {
      result.push({ rank, givenName: pick(sources.givenNames, random), surname: pick(sources.surnames, random) });
    } else if (random() < 0.5) {
      result.push({ rank, givenName: pick(sources.givenNames, random) });
    } else {
      result.push({ rank, surname: pick(sources.surnames, random) });
    }
  }
  return result;
}

@Injectable({
  providedIn: 'root'
})
export class NameGenerateService {
  private readonly http = inject(HttpClient);
  private ranks$?: Observable<Rank[]>;

  /** Loads every data file needed for one generation run; emits once, after all of them arrived. */
  loadSources(language: Language, gender: Gender): Observable<NameSources> {
    if (!LANGUAGES.includes(language) || (gender !== 'male' && gender !== 'female')) {
      return throwError(() => new Error(`Unsupported language/gender: ${language}/${gender}`));
    }
    return forkJoin({
      givenNames: this.loadNameList(`${language}/${gender}.names`),
      surnames: this.loadNameList(`${language}/sur.names`),
      ranks: this.loadRanks(),
    });
  }

  private loadNameList(path: string): Observable<string[]> {
    return this.http.get(`${NAMES_BASE_URL}/${path}`, { responseType: 'text' }).pipe(map(parseNameList));
  }

  private loadRanks(): Observable<Rank[]> {
    this.ranks$ ??= this.http.get<Rank[]>(`${NAMES_BASE_URL}/ranks.json`).pipe(
      // Do not cache a failed request: the next generation run should retry.
      catchError(err => {
        this.ranks$ = undefined;
        return throwError(() => err);
      }),
      shareReplay(1),
    );
    return this.ranks$;
  }
}
