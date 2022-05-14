export const config = {
  api: {
    host: 'API_HOST',
    port: 'API_PORT',
    protocol: 'API_PROTOCOL',
    api_static_folder: 'API_STATIC_FOLDER',
  },
  database: {
    host: 'DATABASE_HOST',
    port: 'DATABASE_PORT',
    name: 'DATABASE_NAME',
    username: 'DATABASE_USERNAME',
    password: 'DATABASE_PASSWORD',
  },
  jwt: {
    secret: 'JWT_SECRET',
    expiration: 'JWT_EXPIRATION',
  },
};
