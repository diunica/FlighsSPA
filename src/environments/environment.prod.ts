const path = '/FlightsSPA/';

const origin = window.location.origin;

export const environment = {
  production: true,
  isDebugMode: false,
  base_api_url: origin + '/flyapi/',
  base_url : origin,
  path: path
};
