import MeiliSearch from 'meilisearch';

const config = {
  host: 'http://127.0.0.1:7700',
  apiKey: 'masterKey',
};
export const client = new MeiliSearch(config);
