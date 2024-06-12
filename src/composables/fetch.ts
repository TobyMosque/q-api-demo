import { createFetch } from '@vueuse/core';
import { useAppStore } from 'stores/app';
import { useDiStore } from 'stores/di';
import type { Pinia } from 'pinia';
import { useI18n } from './i18n';
import { Notify } from 'quasar';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly fetchFn: ReturnType<typeof createFetch>;
  }
}

export function createFetchFn(pinia: Pinia) {
  const fetchFn = createFetch({
    baseUrl: 'https://swapi.dev/api/',
    options: {
      async beforeFetch({ options }) {
        const appStore = useAppStore(pinia);
        options.headers = {
          ...options.headers,
          Authorization: `bearer ${appStore.token}`,
        };
        return {
          options,
        };
      },
      afterFetch(ctx) {
        const { t } = useI18n(pinia);
        Notify.create({
          message: t('success'),
          color: 'positive',
        });
        return ctx;
      },
      onFetchError(ctx) {
        const { t } = useI18n(pinia);
        Notify.create({
          message: t('failed'),
          color: 'negative',
        });
        console.log(ctx);
        return ctx;
      },
    },
  });

  pinia.use(() => ({ fetchFn }));
  return fetchFn;
}

export function useFetchFn(pinia?: Pinia) {
  const di = useDiStore(pinia);
  return di.fetchFn;
}
