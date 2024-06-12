import { boot } from 'quasar/wrappers';
import { createAxios } from 'src/composables/axios';

export default boot(({ store }) => {
  createAxios(store);
});
