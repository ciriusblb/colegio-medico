(function () {
  'use strict';

  angular
      .module('app.widgets')
      .directive('configSlick', configSlick);

      function configSlick() {

          var directive = {
              restrict: 'A',
              link: function (scope, element, attributes, controller) {
                scope.slickConfig1 = {
                  dots: true,
                  infinite: true,
                  slidesToShow: 1,
                  slidesToScroll: 1
                }; 
                scope.slickConfig2 = {
                    dots: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                };
                scope.slickConfig3 = {
                    dots: true,
                    infinite: true,
                    slidesToShow:4,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                };

              }
          };

          return directive;
      };
})();

