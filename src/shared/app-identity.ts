type ImportMetaWithEnv = ImportMeta & { env?: { VITE_BUILD?: string } };

const buildVariant = (import.meta as ImportMetaWithEnv).env?.VITE_BUILD;
const isCanary = buildVariant === 'canary';
export const IS_FORK_BUILD = buildVariant === 'fork';

export const APP_ID = IS_FORK_BUILD
  ? 'com.beelixgit.emdash'
  : isCanary
    ? 'com.emdash.canary'
    : 'com.emdash.stable';
export const PRODUCT_NAME = IS_FORK_BUILD ? 'Emdash (Fork)' : isCanary ? 'Emdash Canary' : 'Emdash';
export const APP_NAME_LOWER = IS_FORK_BUILD ? 'emdash-fork' : isCanary ? 'emdash-canary' : 'emdash';
export const UPDATE_CHANNEL = IS_FORK_BUILD
  ? 'fork-disabled'
  : isCanary
    ? 'v1-canary'
    : 'v1-stable';
export const ARTIFACT_PREFIX = IS_FORK_BUILD
  ? 'emdash-fork'
  : isCanary
    ? 'emdash-canary'
    : 'emdash';
export const R2_BASE_URL = 'https://releases.emdash.sh';
