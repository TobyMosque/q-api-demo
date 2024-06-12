import { boot } from 'quasar/wrappers';
import { createI18n } from 'src/composables/i18n';

export default boot(({ app, store }) => {
  createI18n(app, store);
});
