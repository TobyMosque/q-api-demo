import { boot } from 'quasar/wrappers';
import { createFetchFn } from 'src/composables/fetch';

export default boot(({ store }) => {
  createFetchFn(store);
});
