'use strict';

const AppSettings = {
  appTitle: 'Spotlight Dashboard',
  apiUrl: '/api/v1',
  firebaseURL: 'https://spotlight-dash-dev.firebaseio.com/', // strictly for testing

  //@todo: pull from firbase auth
  valetCoRef: 'VPNE Parking Solutions',
  //userId: 'f0d441cc-73ae-428e-89b5-751e59cddfff' // valet-co
  //userId: '1e38a510-ed2a-4041-9d0a-d407dcdc81d5' // valet
  userId: 'f0d441cc-73ae-428e-89b5-751e59cd20880' // admin
};

export default AppSettings;