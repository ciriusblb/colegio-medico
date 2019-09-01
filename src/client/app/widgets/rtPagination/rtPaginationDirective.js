(function(){
  'use strict';
  angular.module("app.widgets")
    .filter('slice', function() {
      return function(arr, start, end) {
        // console.log(arr);
        // console.log(start);
        // console.log(end);

        return (arr || []).slice(start, end);
      };
    })
    .directive('rtPagination',rtPagination);

  function rtPagination(){
    return {
      restrict : 'E',
            templateUrl: 'app/widgets/rtPagination/rtPaginationTemplate.html',
            scope : {
              datos : '=',
              size : '=',
              pagination : '='
            },
            controller: function ($scope) {

            $scope.$watch('datos', function (newVal, oldVal){                         
              if ($scope.datos>0) {
                // if ($scope.datos<=$scope.pagination.startIndex) {
                //   var aux = $scope.pagination.currentPage -1;
                //   $scope.pagination.currentPage = aux;
                // }
                $scope.setPage(1);
              }
            })

              $scope.setPage=function(page) {
                  if (page < 1 || page > $scope.pagination.totalPages) {
                      return;
                  }
                  $scope.pagination = GetPager($scope.datos, page,$scope.size);
              }
 
          // service implementation
            function GetPager(totalItems, currentPage, pageSize) {


            currentPage = currentPage || 1;
            pageSize = pageSize;
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
            endIndex=endIndex+1;

            var pages = range(startPage, endPage );
            // console.log(pages);

              function range(start, end) {
              var foo = [];
              for (var i = start; i <= end; i++) {
                  foo.push(i);
              }
              return foo;
          }
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }


            }
        }
  }

}());