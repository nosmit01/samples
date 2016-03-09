'use strict';

// angular modules
import 'angular-ui-router';
import 'angular-animate';
import 'angular-ui-bootstrap';
import 'ng-lodash';
import 'angular-moment';
import 'firebase';
import 'angular-sanitize';
import 'ng-csv';
import 'angularfire';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';


// create and bootstrap application
const requires = [
  'ui.router',
  'ngAnimate',
  'ui.bootstrap',
  'ngLodash',
  'angularMoment',
  'firebase',
  'ngSanitize',
  'ngCsv',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', require('./constants'));

angular.module('app').config(require('./on_config'));

angular.module('app').run(require('./on_run'));

angular.bootstrap(document, ['app']);
