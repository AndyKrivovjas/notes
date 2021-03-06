notes.directive("masonry", ['$parse', '$rootScope', '$timeout', function($parse, $rootScope, $timeout) {
  return {
    restrict: 'AC',
    controller: ['$scope', '$element', function($scope, $element){
      var bricks = [];
      this.addBrick = function(brick){
        bricks.push(brick)
      }
      this.removeBrick = function(brick){
        var index = bricks.indexOf(brick);
        if(index!=-1)bricks.splice(index,1);
      }
      $scope.$watch(function(){
        return bricks
      },function(){
        $timeout(function() {
          $element.masonry('reloadItems').masonry('layout');
        });
      },true);

    }],
    link: function (scope, elem, attrs) {
      elem.masonry({ itemSelector: '.masonry-brick'});
      $rootScope.$on('ngRepeatFinished.data.notes', function() {
        elem.masonry({ itemSelector: '.masonry-brick'});
      });
    }
  };
}])
.directive('masonryBrick', ['$compile', '$rootScope', function ($compile, $rootScope) {
  return {
    restrict: 'AC',
    require:'^masonry',
    link: function (scope, elem, attrs,ctrl) {
      ctrl.addBrick(scope.$id);

      scope.$on('$destroy',function(){
        ctrl.removeBrick(scope.$id);
      });
    }
  };
}])
