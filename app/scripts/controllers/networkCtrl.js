'use strict'

angular.module('itmsApp').controller('networkCtrl', function ($scope, orderlist) {


    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    //pageSetUp();
    $.device = 'desktop';
    $.enableJarvisWidgets = true;

    runAllCharts();
    nav_page_height();

    // PAGE RELATED SCRIPTS
    //by default, the selected order is the first order in the order list
    $scope.orderlist = orderlist;
    $scope.selectedOrder = $scope.orderlist[0];


    $scope.showDetail = function (order) {
        $scope.selectedOrder = order;
        var $detailPanel = $('#wid-id-2s');
        var $toggleButton = $detailPanel.find('.jarviswidget-toggle-btn');
        if ($detailPanel.hasClass('jarviswidget-collapsed')) {
            $toggleButton.trigger('click');
        }
    };


});



angular.module('itmsApp').controller('eomaintainCtrl', function ($scope, orderService) {

});

angular.module('itmsApp').controller('eomaintain3rdCtrl', function ($scope, orderService) {

    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    //pageSetUp();
    $.device = 'desktop';
    $.enableJarvisWidgets = true;

    runAllCharts();
    nav_page_height();
});

angular.module('itmsApp').controller('eventmanagementCtrl', function ($scope, orderService) {

    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    //pageSetUp();
    $.device = 'desktop';
    $.enableJarvisWidgets = true;

    runAllCharts();
    nav_page_height();
});

angular.module('itmsApp').controller('dashboardCtrl', function ($scope) {

    $scope.module = 'iTMS';
    $scope.title = 'my iTMS';
});
angular.module('itmsApp').controller('CarouselDemoCtrl', CarouselDemoCtrl);
function CarouselDemoCtrl($scope) {
    $scope.myInterval = 5000;
    $scope.slides = [{
        image: 'img/demo/cr_event.png',
        text: 'adsf'
    },{
        image: 'img/demo/crd-2.png',
        text: 'adsfdsadd'
    },{
        image: 'img/demo/crb-2.png',
        text: 'adsf'
    }];
}
angular.module('itmsApp').controller('CarouselDemoCtrl2', CarouselDemoCtrl2);
function CarouselDemoCtrl2($scope) {
    $scope.myInterval = 5000;
    $scope.slides = [{
        image: 'img/demo/cr_event.png',
        text: 'adsf'
    },{
        image: 'img/demo/m6-2.png',
        text: 'adsf'
    },{
        image: 'img/demo/m6.png',
        text: 'adsf'
    }];
}
angular.module('itmsApp').controller('CarouselDemoCtrl3', CarouselDemoCtrl3);
function CarouselDemoCtrl3($scope) {
    $scope.myInterval = 5000;
    $scope.slides = [{
        image: 'img/demo/mre1.png',
        text: 'adsf'
    },{
        image: 'img/demo/mre2.png',
        text: 'adsf'
    },{
        image: 'img/demo/mre3.png',
        text: 'adsf'
    },{
        image: 'img/demo/mre2.png',
        text: 'aaaaaaaaaaa'
    }];
}
angular.module('itmsApp').controller('CarouselDemoCtrl4', CarouselDemoCtrl4);
function CarouselDemoCtrl4($scope) {
    $scope.myInterval = 5000;
    $scope.slides = [{
        image: 'img/demo/m4-2.png',
        text: 'adsf'
    },{
        image: 'img/demo/m4-1.png',
        text: 'adsf'
    },{
        image: 'img/demo/m4.png',
        text: 'adsf'
    }];
}
angular.module('itmsApp').controller('CarouselDemoCtrl5', CarouselDemoCtr5);
function CarouselDemoCtr5($scope) {
    $scope.myInterval = 5000;
    $scope.slides = [{
        image: 'img/demo/m5.png',
        text: 'adsf'
    },{
        image: 'img/demo/m5-1.png',
        text: 'adsf'
    },{
        image: 'img/demo/m5-2.png',
        text: 'adsf'
    }];
}



