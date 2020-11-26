export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '8080',
    endpoints: {
      allBodies: '/Bodies',
      oneBody: '/Bodies/:name'
    }
  }
};
