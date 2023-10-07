const localBasePath = 'http://localhost:8080/api/v1';

export const environment = {
  production: false,
  personsEndpoints: {
    listAll: `${localBasePath}/persons`,
    listByParameter: `${localBasePath}/persons/search`,
  },
};
