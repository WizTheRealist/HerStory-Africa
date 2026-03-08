export const REGIONS = [
  'West Africa',
  'East Africa',
  'Southern Africa',
  'Central Africa',
] as const

export const ERAS = [
  'Pre-Colonial',
  'Colonial',
  'Independence',
  'Modern',
] as const

export const CAUSES = [
  'Anti-colonial activism',
  'Anti-colonial resistance',
  'Anti-apartheid activism',
  'Anti-apartheid resistance',
  'Anti-corruption',
  'Anti-pass law resistance',
  'Academic freedom',
  'Black liberation',
  'Children\'s rights',
  'Cultural diplomacy',
  'Democracy',
  'Diplomacy & military strategy',
  'Economic reform',
  'Education',
  'Environmental rights',
  'Global trade & development',
  'Grassroots organising',
  'Healthcare rights',
  'Journalism & free press',
  'Labour rights',
  'Nationalist politics',
  'Northern Nigeria women\'s rights',
  'Pan-Africanism',
  'Pass laws',
  'Peace activism',
  'Peace & humanitarian work',
  'Political leadership',
  'Political rights',
  'Post-conflict reconstruction',
  'Religious & social welfare',
  'Sovereignty & independence',
  'Spiritual leadership',
  'Transparency & anti-corruption',
  'Women\'s education',
  'Women\'s leadership',
  'Women\'s political leadership',
  'Women\'s political participation',
  'Women\'s rights',
  'Women\'s suffrage',
] as const

export type Region = typeof REGIONS[number]
export type Era = typeof ERAS[number]
export type Cause = typeof CAUSES[number]
