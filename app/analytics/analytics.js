'use strict';

angular.module('reseta.analytics', [
    'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/analytics', {
    templateUrl: 'analytics/analytics.html',
    controller: 'AnalyticsCtrl'
  });
}])

.controller('AnalyticsCtrl', ['$scope', function($scope) {
    console.log("Hey! You're at analytics page");
}]);
