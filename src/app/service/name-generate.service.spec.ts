import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Language } from '../model/name-options';
import { Rank } from '../model/rank';
import { NameGenerateService, NameSources, generateNames, parseNameList, selectRanks } from './name-generate.service';

function rank(partial: Partial<Rank>): Rank {
  return {
    id: 0, nameFragment: '', inHungarian: '', shortFormHUN: '', shortFormENG: '', gender: 'Gender.unisex',
    rank: true, domain: '', nationality: 'international', occupation: false, ...partial,
  };
}

const RANKS: Rank[] = [
  rank({ id: 1, domain: 'military', nameFragment: 'Private', inHungarian: 'közkatona', shortFormHUN: 'kk.', shortFormENG: 'Pvt.' }),
  rank({ id: 4, domain: 'military', nameFragment: 'Corporal', inHungarian: 'szakaszvezető', shortFormHUN: 'szkv.', shortFormENG: 'Cpl.' }),
  rank({ id: 5, domain: 'military', nameFragment: 'Sergeant', inHungarian: 'őrmester', shortFormHUN: 'őrm.', shortFormENG: 'Sgt.' }),
  rank({ id: 13, domain: 'military', nameFragment: 'Captain', inHungarian: 'százados', shortFormHUN: 'szds.', shortFormENG: 'Cpt.' }),
  rank({ id: 21, domain: 'education', nameFragment: 'Assistant lecturer', inHungarian: 'tanársegéd' }),
  rank({ id: 41, domain: 'SS-military', nameFragment: 'SS-Schütze' }),
  rank({ id: 61, domain: 'civilian', nameFragment: 'Baker', inHungarian: 'pék' }),
];

/** Returns the given values in order, cycling. */
function sequence(...values: number[]): () => number {
  let i = 0;
  return () => values[i++ % values.length];
}

describe('parseNameList', () => {
  it('skips the two header lines, blank lines and surrounding whitespace', () => {
    expect(parseNameList('hu\nmale\nAba\n\n Ádám \nBence\n')).toEqual(['Aba', 'Ádám', 'Bence']);
  });

  it('handles Windows line endings', () => {
    expect(parseNameList('us\r\nany\r\nSmith\r\nJones')).toEqual(['Smith', 'Jones']);
  });
});

describe('selectRanks', () => {
  it('returns the English names of a domain', () => {
    expect(selectRanks(RANKS, 'military')).toEqual(['Private', 'Corporal', 'Sergeant', 'Captain']);
    expect(selectRanks(RANKS, 'SS-military')).toEqual(['SS-Schütze']);
    expect(selectRanks(RANKS, 'civilian')).toEqual(['Baker']);
  });

  it('returns Hungarian education titles from the education domain', () => {
    expect(selectRanks(RANKS, 'HUN-education')).toEqual(['tanársegéd']);
  });

  it('returns abbreviations', () => {
    expect(selectRanks(RANKS, 'military-abb')).toEqual(['Pvt.', 'Cpl.', 'Sgt.', 'Cpt.']);
    expect(selectRanks(RANKS, 'HUN-military-abb')).toEqual(['kk.', 'szkv.', 'őrm.', 'szds.']);
  });

  it('builds police and fire service ranks without the enlisted-only ranks', () => {
    expect(selectRanks(RANKS, 'HUN-police')).toEqual(['r. őrmester', 'r. százados']);
    expect(selectRanks(RANKS, 'HUN-police-abb')).toEqual(['r. őrm.', 'r. szds.']);
    expect(selectRanks(RANKS, 'HUN-fireman')).toEqual(['tű. őrmester', 'tű. százados']);
    expect(selectRanks(RANKS, 'HUN-fireman-abb')).toEqual(['tű. őrm.', 'tű. szds.']);
  });

  it('returns no rank for artists', () => {
    expect(selectRanks(RANKS, 'artist')).toEqual([]);
  });
});

describe('generateNames', () => {
  const sources: NameSources = { givenNames: ['Anna', 'Bea'], surnames: ['Kiss', 'Nagy'], ranks: RANKS };

  it('generates the requested number of full names', () => {
    const names = generateNames(sources, { rank: 'HUN-civilian', count: 3, nameElements: 2 }, sequence(0, 0.9, 0));

    expect(names.length).toBe(3);
    expect(names[0]).toEqual({ rank: 'pék', givenName: 'Bea', surname: 'Kiss' });
  });

  it('generates single-element names from either list', () => {
    // artists have no rank to pick, so per name: coin flip (< 0.5 => given name), then the list pick
    const names = generateNames(sources, { rank: 'artist', count: 2, nameElements: 1 }, sequence(0.1, 0.9, 0.7, 0));

    expect(names).toEqual([
      { rank: undefined, givenName: 'Bea' },
      { rank: undefined, surname: 'Kiss' },
    ]);
  });

  it('does not invent names when a list is empty', () => {
    const names = generateNames({ givenNames: [], surnames: [], ranks: [] }, { rank: 'artist', count: 1, nameElements: 2 });
    expect(names).toEqual([{ rank: undefined, givenName: undefined, surname: undefined }]);
  });
});

describe('NameGenerateService', () => {
  let service: NameGenerateService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(NameGenerateService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('emits only after every data file has arrived', () => {
    const emitted: NameSources[] = [];
    service.loadSources('hungarian', 'female').subscribe(sources => emitted.push(sources));

    http.expectOne('assets/names/hungarian/sur.names').flush('hu\nany\nKiss\n');
    http.expectOne('assets/names/ranks.json').flush(RANKS);
    expect(emitted.length).toBe(0);

    http.expectOne('assets/names/hungarian/female.names').flush('hu\nfemale\nAnna\n');
    expect(emitted).toEqual([{ givenNames: ['Anna'], surnames: ['Kiss'], ranks: RANKS }]);
  });

  it('downloads the rank list only once', () => {
    service.loadSources('british', 'male').subscribe();
    http.expectOne('assets/names/ranks.json').flush(RANKS);
    http.match(req => req.url.endsWith('.names')).forEach(req => req.flush('gb\nmale\nJohn'));

    service.loadSources('british', 'male').subscribe();
    http.expectNone('assets/names/ranks.json');
    http.match(req => req.url.endsWith('.names')).forEach(req => req.flush('gb\nmale\nJohn'));
  });

  it('retries the rank list after a failed download', () => {
    const errors: unknown[] = [];
    service.loadSources('british', 'male').subscribe({ error: err => errors.push(err) });
    http.expectOne('assets/names/ranks.json').flush('boom', { status: 500, statusText: 'Server Error' });
    // forkJoin cancels the sibling requests once one of them fails
    expect(http.match(req => req.url.endsWith('.names')).every(req => req.cancelled)).toBe(true);
    expect(errors.length).toBe(1);

    service.loadSources('british', 'male').subscribe();
    http.expectOne('assets/names/ranks.json').flush(RANKS);
    http.match(req => req.url.endsWith('.names')).forEach(req => req.flush('gb\nmale\nJohn'));
  });

  it('rejects unknown languages without touching the network', () => {
    const errors: unknown[] = [];
    service.loadSources('../../secret' as Language, 'male').subscribe({ error: err => errors.push(err) });
    expect(errors.length).toBe(1);
  });
});
