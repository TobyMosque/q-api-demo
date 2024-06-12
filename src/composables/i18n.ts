import { useDiStore } from 'stores/di';
import { App } from 'vue';
import { createI18n as createI18nFn } from 'vue-i18n';
import messages from 'src/i18n';
import type { Pinia } from 'pinia';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly i18n: I18nInstance;
  }
}

type I18nInstance = ReturnType<typeof createI18nInner>['global'];
function createI18nInner() {
  return createI18nFn({
    locale: 'en-US',
    legacy: false,
    messages,
  });
}

export function createI18n(app: App<unknown>, pinia: Pinia) {
  const i18n = createI18nInner();

  // Set i18n instance on app
  app.use(i18n);
  pinia.use(() => ({ i18n: i18n.global }));
}

export function useI18n(pinia?: Pinia) {
  const di = useDiStore(pinia);
  return di.i18n;
}
