'use strict';

// angular modules
import 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'ngStorage';
import 'ng-infinite-scroll'
import 'ng-lodash';
import 'angular-moment';
import 'angular-sanitize';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';


// create and bootstrap application
const requires = [
  'ui.router',
  'ui.bootstrap',
  'ngStorage',
  'infinite-scroll',
  'ngLodash',
  'angularMoment',
  'ngSanitize',
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
