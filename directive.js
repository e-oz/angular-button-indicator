'use strict';

angular.module('jm-button-indicator', [])
  .directive('jmButtonIndicator', function () {
    return {
      template: '<button ng-class="getClass()" ng-click="btnClick()" ng-disabled="btnDisabled">\
                   {{getTitle()}}\
                   <span ng-if="getIconClass()">&nbsp;<span ng-class="getIconClass()"></span></span>\
                 </button>',
      restrict: 'ACE',
      replace: true,
      scope: {
        classBtn: '@',
        classReady: '@',
        classBusy: '@',
        classSuccess: '@',
        classFailed: '@',
        iconReady: '@',
        iconBusy: '@',
        iconSuccess: '@',
        iconFailed: '@',
        titleReady: '@',
        titleBusy: '@',
        titleSuccess: '@',
        titleFailed: '@',
        btnDisabled: '=?',
        busy: '=btnBusy',
        success: '=btnSuccess',
        failed: '=btnFailed',
        clickController: '&btnClick',
        clickSuccessController: '&successClick',
        clickFailedController: '&failedClick',
        clickBusyController: '&busyClick',
        ionicDefaults: '@'
      },
      link: function postLink(scope, element, attrs) {

      },
      controller: function ($scope) {
        $scope.getClass = function () {
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

        $scope.getTitle = function () {
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

        $scope.getIconClass = function () {
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

        $scope.btnClick = function (event) {
          if ($scope.busy) {
            return false;
          }
          if ($scope.success) {
            if (angular.isFunction($scope.clickSuccessController)) {
              return $scope.clickSuccessController(event);
            }
            else {
              $scope.success = false;
            }
          }
          if ($scope.busy) {
            if (angular.isFunction($scope.clickBusyController)) {
              return $scope.clickBusyController(event);
            }
            else {
              $scope.busy = false;
            }
          }
          if ($scope.failed) {
            if (angular.isFunction($scope.clickFailedController)) {
              return $scope.clickFailedController(event);
            }
            else {
              $scope.failed = false;
            }
          }

          return $scope.clickController(event);
        };
      },
      compile: function (element, attrs) {
        if (attrs.ionicDefaults) {
          attrs.classBtn = attrs.classBtn || 'button';
          attrs.classReady = attrs.classReady || 'button-positive';
          attrs.classBusy = attrs.classBusy || 'button-stable';
          attrs.classSuccess = attrs.classSuccess || 'button-balanced';
          attrs.classFailed = attrs.classFailed || 'button-assertive';
          attrs.iconBusy = attrs.iconBusy || 'ion-loop';
          attrs.iconSuccess = attrs.iconSuccess || 'ion-checkmark-circled';
          attrs.iconFailed = attrs.iconFailed || 'ion-close-circled';
        }
        else {
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
    }
  });
