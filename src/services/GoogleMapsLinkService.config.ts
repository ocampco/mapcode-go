// TODO: Extract to .env
export const GOOGLE_MAPS_LINK_EXPAND_API_URL = 'https://dark-glitter-fb94.ocampco.workers.dev';

export const SHORT_URL_PREFIXES = [
'https://maps.app.goo.gl/',
'https://goo.gl/maps/',
'https://goo.gl/app/maps/',
];

export const FULL_URL_REGEX = /^https:\/\/(www\.)?(maps\.google\.|google\.[a-z.]{2,6}\/maps)/

export const FULL_URL_COORDINATES_REGEXES = [
    /[?&]q=([\d.-]+),([\d.-]+)/,
    /\/@([\d.-]+),([\d.-]+)/,
    /!3d([\d.-]+)!4d([\d.-]+)/,
    /place\/([\d.-]+),([\d.-]+)/,
]

export enum GoogleMapsUrlType {
  SHORT = 'short',
  FULL = 'full',
  INVALID = 'invalid',
}