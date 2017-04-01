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

.controller('PhilMapController', ['$scope', '$http', 'regionsPath',
    'areasArr', 'lines',
    function($scope, $http, regionsPath, areasArr, lines) {
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

        var labels = [
            {
                "title": "Region I",
                "selectable": true,
                "longitude": 117.5599,
                "latitude": 17.3706,
                "label": "Cholera",
                "labelPosition": "right",
                "labelColor": "rgba(198,44,44,1)",
                "labelRollOverColor": "rgba(198,44,44,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region I",
                "selectable": true,
                "longitude": 117.5692,
                "latitude": 16.9412,
                "label": "D1",
                "labelPosition": "right",
                "labelColor": "rgba(198,44,44,1)",
                "labelRollOverColor": "rgba(198,44,44,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "CAR",
                "selectable": true,
                "longitude": 118.0022,
                "latitude": 19.1976,
                "label": "HIV/STI",
                "labelPosition": "right",
                "labelColor": "rgba(232,222,62,1)",
                "labelRollOverColor": "rgba(232,222,62,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "CAR",
                "selectable": true,
                "longitude": 118.0515,
                "latitude": 18.7703,
                "label": "DC",
                "labelPosition": "right",
                "labelColor": "rgba(232,222,62,1)",
                "labelRollOverColor": "rgba(232,222,62,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region III",
                "selectable": true,
                "longitude": 116.5227,
                "latitude": 16.3306,
                "label": "Neonatal Tetanus",
                "labelPosition": "right",
                "labelColor": "rgba(74,129,210,1)",
                "labelRollOverColor": "rgba(74,129,210,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region III",
                "selectable": true,
                "longitude": 116.5214,
                "latitude": 15.9236,
                "label": "D3",
                "labelPosition": "right",
                "labelColor": "rgba(74,129,210,1)",
                "labelRollOverColor": "rgba(74,129,210,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region II",
                "selectable": true,
                "longitude": 124.5657,
                "latitude": 17.9078,
                "label": "Pertussis",
                "labelPosition": "right",
                "labelColor": "rgba(229,127,29,1)",
                "labelRollOverColor": "rgba(229,127,29,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region II",
                "selectable": true,
                "longitude": 124.5398,
                "latitude": 17.4325,
                "label": "D2",
                "labelPosition": "right",
                "labelColor": "rgba(229,127,29,1)",
                "labelRollOverColor": "rgba(229,127,29,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region IV-A",
                "selectable": true,
                "longitude": 118.3762,
                "latitude": 14.9427,
                "label": "Pertussis",
                "labelPosition": "right",
                "labelColor": "rgba(26,205,55,1)",
                "labelRollOverColor": "rgba(26,205,55,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region IV-A",
                "selectable": true,
                "longitude": 118.4243,
                "latitude": 14.4847,
                "label": "D4A",
                "labelPosition": "right",
                "labelColor": "rgba(26,205,55,1)",
                "labelRollOverColor": "rgba(26,205,55,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region IV-B",
                "selectable": true,
                "longitude": 116.9988,
                "latitude": 13.7355,
                "label": "Measles",
                "labelPosition": "right",
                "labelColor": "rgba(234,178,23,1)",
                "labelRollOverColor": "rgba(234,178,23,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region IV-B",
                "selectable": true,
                "longitude": 116.9682,
                "latitude": 13.2237,
                "label": "D4B",
                "labelPosition": "right",
                "labelColor": "rgba(234,178,23,1)",
                "labelRollOverColor": "rgba(234,178,23,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "NCR",
                "selectable": true,
                "longitude": 123.2836,
                "latitude": 15.3238,
                "label": "Measles",
                "labelPosition": "right",
                "labelColor": "rgba(135,29,229,1)",
                "labelRollOverColor": "rgba(135,29,229,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "NCR",
                "selectable": true,
                "longitude": 123.2783,
                "latitude": 14.8908,
                "label": "DNCR",
                "labelPosition": "right",
                "labelColor": "rgba(135,29,229,1)",
                "labelRollOverColor": "rgba(135,29,229,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region V",
                "selectable": true,
                "longitude": 126.2452,
                "latitude": 14.0864,
                "label": "Dengue",
                "labelPosition": "right",
                "labelColor": "rgba(198,123,172,1)",
                "labelRollOverColor": "rgba(198,123,172,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region V",
                "selectable": true,
                "longitude": 126.2946,
                "latitude": 13.6074,
                "label": "D5",
                "labelPosition": "right",
                "labelColor": "rgba(198,123,172,1)",
                "labelRollOverColor": "rgba(198,123,172,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region VI",
                "selectable": true,
                "longitude": 120.5502,
                "latitude": 11.6627,
                "label": "Dengue",
                "labelPosition": "right",
                "labelColor": "rgba(210,42,76,1)",
                "labelRollOverColor": "rgba(210,42,76,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region VI",
                "selectable": true,
                "longitude": 120.5695,
                "latitude": 11.2239,
                "label": "D6",
                "labelPosition": "right",
                "labelColor": "rgba(210,42,76,1)",
                "labelRollOverColor": "rgba(210,42,76,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region NIR",
                "selectable": true,
                "longitude": 120.7208,
                "latitude": 10.2932,
                "label": "Acute Flaccid Paralysis",
                "labelPosition": "right",
                "labelColor": "rgba(42,210,135,1)",
                "labelRollOverColor": "rgba(42,210,135,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region NIR",
                "selectable": true,
                "longitude": 120.7442,
                "latitude": 9.9015,
                "label": "DNIR",
                "labelPosition": "right",
                "labelColor": "rgba(42,210,135,1)",
                "labelRollOverColor": "rgba(42,210,135,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region VII",
                "selectable": true,
                "longitude": 127.9247,
                "latitude": 10.0953,
                "label": "Acute Flaccid Paralysis",
                "labelPosition": "right",
                "labelColor": "rgba(104,85,160,1)",
                "labelRollOverColor": "rgba(104,85,160,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region VII",
                "selectable": true,
                "longitude": 127.9494,
                "latitude": 9.7035,
                "label": "D7",
                "labelPosition": "right",
                "labelColor": "rgba(104,85,160,1)",
                "labelRollOverColor": "rgba(104,85,160,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region VIII",
                "selectable": true,
                "longitude": 127.2337,
                "latitude": 12.6955,
                "label": "Influenza",
                "labelPosition": "right",
                "labelColor": "rgba(6,50,91,1)",
                "labelRollOverColor": "rgba(6,50,91,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region VIII",
                "selectable": true,
                "longitude": 127.209,
                "latitude": 12.2819,
                "label": "D8",
                "labelPosition": "right",
                "labelColor": "rgba(6,50,91,1)",
                "labelRollOverColor": "rgba(6,50,91,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region XIII",
                "selectable": true,
                "longitude": 128.6119,
                "latitude": 8.9187,
                "label": "Influenza",
                "labelPosition": "right",
                "labelColor": "rgba(39,115,22,1)",
                "labelRollOverColor": "rgba(39,115,22,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region XIII",
                "selectable": true,
                "longitude": 128.5872,
                "latitude": 8.5011,
                "label": "D13",
                "labelPosition": "right",
                "labelColor": "rgba(39,115,22,1)",
                "labelRollOverColor": "rgba(39,115,22,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region X",
                "selectable": true,
                "longitude": 128.0468,
                "latitude": 7.9507,
                "label":  "Diptheria",
                "labelPosition": "right",
                "labelColor": "rgba(145,79,26,1)",
                "labelRollOverColor": "rgba(145,79,26,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region X",
                "selectable": true,
                "longitude": 128.0715,
                "latitude": 7.5167,
                "label": "D10",
                "labelPosition": "right",
                "labelColor": "rgba(145,79,26,1)",
                "labelRollOverColor": "rgba(145,79,26,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region XI",
                "selectable": true,
                "longitude": 127.0571,
                "latitude": 6.9017,
                "label":  "Diptheria",
                "labelPosition": "right",
                "labelColor": "rgba(110,4,4,1)",
                "labelRollOverColor": "rgba(110,4,4,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region XI",
                "selectable": true,
                "longitude": 127.0571,
                "latitude": 6.5327,
                "label": "D11",
                "labelPosition": "right",
                "labelColor": "rgba(110,4,4,1)",
                "labelRollOverColor": "rgba(110,4,4,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region IX",
                "selectable": true,
                "longitude": 120.3714,
                "latitude": 8.2798,
                "label": "Rotavirus",
                "labelPosition": "right",
                "labelColor": "rgba(236,81,219,1)",
                "labelRollOverColor": "rgba(236,81,219,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region IX",
                "selectable": true,
                "longitude": 120.4208,
                "latitude": 7.8615,
                "label": "D9",
                "labelPosition": "right",
                "labelColor": "rgba(236,81,219,1)",
                "labelRollOverColor": "rgba(236,81,219,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "ARMM",
                "selectable": true,
                "longitude": 119.3842,
                "latitude": 7.3428,
                "label": "Rotavirus",
                "labelPosition": "right",
                "labelColor": "rgba(40,39,37,1)",
                "labelRollOverColor": "rgba(40,39,37,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "ARMM",
                "selectable": true,
                "longitude": 119.3583,
                "latitude": 6.9744,
                "label": "DA",
                "labelPosition": "right",
                "labelColor": "rgba(40,39,37,1)",
                "labelRollOverColor": "rgba(40,39,37,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region XII",
                "selectable": true,
                "longitude": 117.8579,
                "latitude": 6.5056,
                "label": "Cholera",
                "labelPosition": "right",
                "labelColor": "rgba(115,26,88,1)",
                "labelRollOverColor": "rgba(115,26,88,0.8)",
                "labelFontSize": 15
            },
            {
                "title": "Region XII",
                "selectable": true,
                "longitude": 117.8832,
                "latitude": 6.0357,
                "label": "D12",
                "labelPosition": "right",
                "labelColor": "rgba(115,26,88,1)",
                "labelRollOverColor": "rgba(115,26,88,0.8)",
                "labelFontSize": 15
            }

        ];

        $scope.addMed = function() {
          $scope.adding = !$scope.adding;
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
                            // var queryString =
                            //     "http://10.239.118.180:3000/api/prediction/diseases?" +
                            //     "month=1&year=2016&region=" + $scope.currentRegion.trim();
                            // $http.get(queryString)
                            //     .then(function(res) {
                            //         res.data.expected_cases = JSON.parse(res.data.expected_cases.replace(new RegExp(/\'/, 'g'), '\"'));
                            //         console.log(res.data.expected_cases);
                            //         var keysSorted =
                            //             Object.keys(res.data.expected_cases)
                            //                 .sort(function(a,b){return res.data.expected_cases[a]-res.data.expected_cases[b]});
                            //         $scope.labelres.data.expected_cases[keysSorted[(keysSorted.length-1)]]);
                            //     });



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
