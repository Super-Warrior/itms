angular.module('itms.dashboard')
  .controller('DashboardCtrl', function ($scope) {
    $scope.module = 'iTMS';
    $scope.title = 'my iTMS';
  })
  .controller('CarouselDemoCtrl', CarouselDemoCtrl)
  .controller('CarouselDemoCtrl2', CarouselDemoCtrl2)
  .controller('CarouselDemoCtrl3', CarouselDemoCtrl3)
  .controller('CarouselDemoCtrl4', CarouselDemoCtrl4)
  .controller('CarouselDemoCtrl5', CarouselDemoCtrl5);

function CarouselDemoCtrl($scope) {
  $scope.myInterval = 5000;
  $scope.slides = [{
    image: 'img/demo/cr_event.png',
    text: 'adsf'
  }, {
    image: 'img/demo/crd-2.png',
    text: 'adsfdsadd'
  }, {
    image: 'img/demo/crb-2.png',
    text: 'adsf'
  }];
}

function CarouselDemoCtrl2($scope) {
  $scope.myInterval = 5000;
  $scope.slides = [{
    image: 'img/demo/cr_event.png',
    text: 'adsf'
  }, {
    image: 'img/demo/m6-2.png',
    text: 'adsf'
  }, {
    image: 'img/demo/m6.png',
    text: 'adsf'
  }];
}

function CarouselDemoCtrl3($scope) {
  $scope.myInterval = 5000;
  $scope.slides = [{
    image: 'img/demo/mre1.png',
    text: 'adsf'
  }, {
    image: 'img/demo/mre2.png',
    text: 'adsf'
  }, {
    image: 'img/demo/mre3.png',
    text: 'adsf'
  }, {
    image: 'img/demo/mre2.png',
    text: 'aaaaaaaaaaa'
  }];
}

function CarouselDemoCtrl4($scope) {
  $scope.myInterval = 5000;
  $scope.slides = [{
    image: 'img/demo/m4-2.png',
    text: 'adsf'
  }, {
    image: 'img/demo/m4-1.png',
    text: 'adsf'
  }, {
    image: 'img/demo/m4.png',
    text: 'adsf'
  }];
}

function CarouselDemoCtrl5($scope) {
  $scope.myInterval = 5000;
  $scope.slides = [{
    image: 'img/demo/m5.png',
    text: 'adsf'
  }, {
    image: 'img/demo/m5-1.png',
    text: 'adsf'
  }, {
    image: 'img/demo/m5-2.png',
    text: 'adsf'
  }];
}
