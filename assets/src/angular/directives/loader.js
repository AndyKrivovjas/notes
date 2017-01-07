notes.directive('pageLoader', [ '$q', '$rootScope', function($q, $rootScope) {
  return {
    restrict:'AE',
    template:'<div ng-show="isRouteLoading" id="loader"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div>',
    link:function(scope, elem, attrs){
      scope.isRouteLoading = true;
      $('.loaderh').remove();

      $rootScope.$on('$routeChangeStart', function(){
        scope.isRouteLoading = true;
      });

      $rootScope.$on('$routeChangeSuccess', function(){
        scope.isRouteLoading = false;
      });
    }
  };
}])