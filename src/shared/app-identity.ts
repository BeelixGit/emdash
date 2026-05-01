type ImportMetaWithEnv = ImportMeta & { env?: { VITE_BUILD?: string } };

// Resolve in both contexts:
//   - Vite-bundled main/renderer: `import.meta.env.VITE_BUILD` is REPLACED at
//     build time with the literal string from the env when electron-vite ran.
//   - electron-builder.config.ts (plain Node, not Vite-processed): falls
//     through to process.env, which the parent shell sets via package:fork:mac.
//   - Renderer at runtime (sandboxed, no process global): the typeof guard
//     prevents a ReferenceError; falls through to undefined safely.
const buildVariant: string | undefined =
  (import.meta as ImportMetaWithEnv).env?.VITE_BUILD ??
  (typeof process !== 'undefined' ? process.env?.VITE_BUILD : undefined);
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
