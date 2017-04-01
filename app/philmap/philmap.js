'use strict';

angular.module('reseta.philmap', [
    'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'philmap/philmap.html',
        controller: 'PhilMapController'
    });
}])

.controller('PhilMapController', ['$scope', 'regionsPath',
    'areasArr', 'lines', 'labels',
    function($scope, regionsPath, areasArr, lines, labels) {
        $scope.adding = false;
        $scope.region = '';
        $scope.predictedData = {
            "Region I" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region II" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                },
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region III" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                },
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                },
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region IV" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region V" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region VI" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region VII" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region VIII" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region IX" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region X" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region XI" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region XII" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "Region XIII" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "ARMM" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "CAR" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "NCR" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
            "NIR" : [
                {
                    "medicine":"Paracetamol",
                    "disease":"HIV/STI",
                    "supply":"2048"
                }
            ],
        };
        /*MOCK DATA*/
        $scope.diseases = [
          "HIV/STI",
          "Neonatal Tetanus",
          "Pertussis",
          "Cholera",
          "Typhoid",
          "Rotavirus",
          "Leptospirosis",
          "Diptheria",
          "Dengue",
          "Chikungunya",
          "Measles",
          "Acute Meningitis Encephalitis Syndrome",
          "Acute Flaccid Paralysis",
          "Hand Foot and Mouth Disease",
          "Influenza",
          "Malaria"
        ]
        $scope.data = {};

        $scope.addMed = function() {
          if($scope.adding) {
            var newMed = [];
          }

          $scope.adding = !$scope.adding;
          console.log($scope.adding);
        }

        //numbers
        $scope.initZoomLvl = 0;
        $scope.initZoomLongitude = 0;
        $scope.initZoomLatitude = 0;
        $scope.currentZoomLvl = 0;
        $scope.currentZoomLongitude = 0;
        $scope.currentZoomLatitude = 0;

        //strings
        $scope.currentRegion = "";

        //booleans
        $scope.isZoomed = false;
        $scope.hideDetailModal = true;

        AmCharts.maps.philippinesLow = {
            "svg": {
                "defs": {
                    "amcharts:ammap": {
                        "projection":"mercator",
                        "leftLongitude":"116.927358",
                        "topLatitude":"20.834567",
                        "rightLongitude":"126.606334",
                        "bottomLatitude":"4.641372"
                    }
                },
                "g":{
                    "path": regionsPath
                }
            }
        };

        AmCharts.makeChart("map",{
            "type": "map",
            "addClassNames": true,
            "fontSize": 15,
            "color": "#000000",
            "preventDragOut": true,
            "projection": "mercator",
            "backgroundAlpha": 1,
            "backgroundColor": "rgba(205,224,224,1)",
            "dataProvider": {
              "map": "philippinesLow",
              "getAreasFromMap": true,
              "areas": areasArr,
              "lines": lines,
              "images": labels
            },
            "areasSettings": {
              "autoZoom": true,
              "color": "rgba(129,129,129,1)",
              "outlineColor": "rgba(205,224,224,1)",
              "rollOverOutlineColor": "rgba(205,224,224,1)",
              "rollOverBrightness": 20,
              "selectedBrightness": 20,
              "selectable": true,
              "unlistedAreasAlpha": 0,
              "unlistedAreasOutlineAlpha": 0
            },
            "linesSettings": {
              "selectable": true,
              "rollOverBrightness": 20,
              "selectedBrightness": 20
            },
            "zoomControl": {
              "zoomControlEnabled": true,
              "homeButtonEnabled": false,
              "panControlEnabled": false,
              "left": 35,
              "bottom": 35,
              "maxZoomLevel": 1.75,
              "minZoomLevel": 0.75,
              "gridHeight": 100,
              "gridAlpha": 0.1,
              "gridBackgroundAlpha": 0,
              "gridColor": "#FFFFFF",
              "draggerAlpha": 1,
              "buttonCornerRadius": 2
            },
            "listeners": [
                {
                    "event": "rendered",
                    "method": function(e) {
                        var map = e.chart;
                        $scope.initZoomLvl = map.zoomLevel();
                        $scope.initZoomLatitude = map.zoomLatitude();
                        $scope.initZoomLongitude = map.zoomLongitude();
                    }
                },
                {
                    "event": "clickMapObject",
                    "method": function(event) {
                        $scope.$apply(function(){
                            $scope.region = event.mapObject.title;
                            $scope.data = $scope.predictedData;
                        });
                        var map = event.chart;
                        if($scope.isZoomed){
                            $scope.data = {};
                            if(($scope.currentRegion == $scope.region)){
                                //Set booleans
                                $scope.isZoomed = !$scope.isZoomed;
                                map.zoomToLongLat(
                                    $scope.initZoomLvl,
                                    $scope.initZoomLongitude,
                                    $scope.initZoomLatitude
                                );
                                $scope.$apply(function(){
                                    $scope.hideDetailModal = !$scope.hideDetailModal;
                                });
                            } else {
                                $scope.currentRegion = event.mapObject.title;
                                $scope.$apply(function(){
                                    $scope.data = $scope.predictedData;
                                });
                            }

                        } else if(!$scope.isZoomed){
                            //Set booleans
                            $scope.isZoomed = !$scope.isZoomed;
                            var info = map.getDevInfo();
                            $scope.currentRegion = event.mapObject.title;

                            //create showing details here
                            $scope.$apply(function(){
                                $scope.hideDetailModal = !$scope.hideDetailModal;
                            });
                        }
                    }
                }
            ]
          });
}]);
