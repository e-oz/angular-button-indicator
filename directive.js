'use strict';

angular.module('eugene-oz.button-indicator', [])
  .directive('jmButtonIndicator', function() {
               return {
                 templateUrl: 'bower_components/angular-button-indicator/jmButtonIndicator.html',
                 restrict:    'ACE',
                 replace:     true,
                 scope:       {
                   classBtn:        '@',
                   classReady:      '@',
                   classBusy:       '@',
                   classSuccess:    '@',
                   classFailed:     '@',
                   iconReady:       '@',
                   iconBusy:        '@',
                   iconSuccess:     '@',
                   iconFailed:      '@',
                   titleReady:      '@',
                   titleBusy:       '@',
                   titleSuccess:    '@',
                   titleFailed:     '@',
                   btnDisabled:     '=?',
                   busy:            '=btnBusy',
                   success:         '=btnSuccess',
                   failed:          '=btnFailed',
                   clickController: '&btnClick'
                 },
                 link:        function postLink(scope, element, attrs) {

                 },
                 controller:  function($scope) {
                   $scope.getClass = function() {
                     if ($scope.busy) {
                       return $scope.classBtn + ' ' + $scope.classBusy;
                     }
                     if ($scope.success) {
                       return $scope.classBtn + ' ' + $scope.classSuccess;
                     }
                     if ($scope.failed) {
                       return $scope.classBtn + ' ' + $scope.classFailed;
                     }
                     return $scope.classBtn + ' ' + $scope.classReady;
                   };

                   $scope.getTitle = function() {
                     if ($scope.busy && $scope.titleBusy) {
                       return $scope.titleBusy;
                     }
                     if ($scope.success && $scope.titleSuccess) {
                       return $scope.titleSuccess;
                     }
                     if ($scope.failed && $scope.titleFailed) {
                       return $scope.titleFailed;
                     }
                     return $scope.titleReady;
                   };

                   $scope.getIconClass = function() {
                     if ($scope.busy && $scope.iconBusy) {
                       return $scope.iconBusy;
                     }
                     if ($scope.success && $scope.iconSuccess) {
                       return $scope.iconSuccess;
                     }
                     if ($scope.failed && $scope.iconFailed) {
                       return $scope.iconFailed;
                     }
                     return $scope.iconReady;
                   };

                   $scope.btnClick = function(event) {
                     if ($scope.busy) {
                       return false;
                     }
                     if ($scope.success || $scope.failed) {
                       $scope.success = false;
                       $scope.failed = false;
                       $scope.busy = false;
                       return true;
                     }
                     return $scope.clickController(event);
                   };
                 },
                 compile:     function(element, attrs) {
                   attrs.classBtn = attrs.classBtn || 'btn';
                   attrs.classReady = attrs.classReady || 'btn-primary';
                   attrs.classBusy = attrs.classBusy || 'btn-default';
                   attrs.classSuccess = attrs.classSuccess || 'btn-success';
                   attrs.classFailed = attrs.classFailed || 'btn-danger';
                   attrs.iconBusy = attrs.iconBusy || 'fa fa-spinner fa-spin';
                   attrs.iconSuccess = attrs.iconSuccess || 'glyphicon glyphicon-ok';
                   attrs.iconFailed = attrs.iconFailed || 'glyphicon glyphicon-exclamation-sign';
                 }
               }
             });
