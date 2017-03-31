'use strict';

angular.module('reseta', [
    'ngRoute',
    'reseta.analytics',
    'reseta.testpage',
    'reseta.philmap'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/'});
}]);
