export const LANGUAGES = [
  'american',
  'argentinian',
  'australian',
  'brazilian',
  'british',
  'bulgarian',
  'canadian',
  'chinese',
  'danish',
  'finnish',
  'french',
  'german',
  'hungarian',
  'kazakh',
  'mexican',
  'norwegian',
  'polish',
  'portuguese',
  'russian',
  'spanish',
  'swedish',
  'turkish',
  'ukranian',
] as const;

export type Language = (typeof LANGUAGES)[number];

export type Gender = 'male' | 'female';

export type RankCategory =
  | 'education'
  | 'HUN-education'
  | 'HUN-police'
  | 'HUN-police-abb'
  | 'HUN-fireman'
  | 'HUN-fireman-abb'
  | 'HUN-military'
  | 'HUN-military-abb'
  | 'military'
  | 'military-abb'
  | 'SS-military'
  | 'civilian'
  | 'HUN-civilian'
  | 'artist';

/** Where the rank is rendered relative to the name. */
export type RankPosition = 'prefix' | 'suffix';

export interface RankOption {
  value: RankCategory;
  label: string;
  position: RankPosition;
}

export const RANK_OPTIONS: readonly RankOption[] = [
  { value: 'education', label: 'Education', position: 'suffix' },
  { value: 'HUN-education', label: 'Hungarian education', position: 'suffix' },
  { value: 'HUN-police', label: 'Hungarian police officer', position: 'suffix' },
  { value: 'HUN-police-abb', label: 'Hungarian police officer with abbreviated form', position: 'suffix' },
  { value: 'HUN-fireman', label: 'Hungarian fireman officer', position: 'suffix' },
  { value: 'HUN-fireman-abb', label: 'Hungarian fireman officer with abbreviated form', position: 'suffix' },
  { value: 'HUN-military', label: 'Hungarian military officer', position: 'suffix' },
  { value: 'HUN-military-abb', label: 'Hungarian military officer with abbreviated form', position: 'suffix' },
  { value: 'military', label: 'USA military', position: 'prefix' },
  { value: 'military-abb', label: 'USA military with abbreviated form', position: 'prefix' },
  { value: 'SS-military', label: 'SS-military', position: 'prefix' },
  { value: 'civilian', label: 'Civilian', position: 'suffix' },
  { value: 'HUN-civilian', label: 'Hungarian civilian', position: 'suffix' },
  { value: 'artist', label: 'Artist (no rank)', position: 'prefix' },
];

export const MAX_NAMES = 10;
