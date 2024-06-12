import axios, { type AxiosInstance } from 'axios';
import { useDiStore } from 'stores/di';
import type { Pinia } from 'pinia';
import { useAppStore } from 'src/stores/app';
import { Notify } from 'quasar';
import { useI18n } from './i18n';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly api: AxiosInstance;
  }
}

export function createAxios(pinia: Pinia) {
  const api = axios.create({
    baseURL: 'https://swapi.dev/api/',
  });

  api.interceptors.request.use(
    (config) => {
      const appStore = useAppStore(pinia);
      config.headers = {
        ...config.headers,
        Authorization: `bearer ${appStore.token}`,
      } as never;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => {
      const { t } = useI18n(pinia);
      Notify.create({
        message: t('success'),
        color: 'positive',
      });
      return response;
    },
    (error) => {
      const { t } = useI18n(pinia);
      Notify.create({
        message: t('failed'),
        color: 'negative',
      });
      console.log(error);
      return Promise.reject(error);
    },
  );

  pinia.use(() => ({ api }));
}

export function useAxios(pinia?: Pinia) {
  const di = useDiStore(pinia);
  return di.api;
}
