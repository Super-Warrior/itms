module.exports = {
    vendor_files: {
        vendorjs: [
            'vendor/jquery/dist/jquery.js',
            'vendor/lodash/dist/lodash.js',
            'vendor/json3/lib/json3.min.js',
            'vendor/es5-shim/es5-shim.js',
            'vendor/bootstrap/dist/js/bootstrap.js',
            'vendor/angular/angular.js',
            'vendor/angular-resource/angular-resource.js',
            'vendor/angular-cookies/angular-cookies.js',
            'vendor/angular-sanitize/angular-sanitize.js',
            'vendor/angular-route/angular-route.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
            'vendor/jqueryui/ui/jquery-ui.js',
            'vendor/jquery-form/jquery.form.js',
            'vendor/angular-loading-bar/src/loading-bar.js',
            'vendor/angular-animate/angular-animate.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',

            'src/legacyscripts/jarvismenu.js',
            'src/legacyscripts/legacyscript.js',
            'src/legacyscripts/notification/SmartNotification.min.js',
            'src/legacyscripts/smartwidgets/jarvis.widget.js',
            'src/legacyscripts/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js',
            'src/legacyscripts/plugin/sparkline/jquery.sparkline.min.js',
            'src/legacyscripts/plugin/jquery-validate/jquery.validate.min.js',
            'src/legacyscripts/plugin/masked-input/jquery.maskedinput.min.js',
            'src/legacyscripts/plugin/select2/select2.min.js',
            'src/legacyscripts/plugin/bootstrap-slider/bootstrap-slider.min.js',
            'src/legacyscripts/plugin/msie-fix/jquery.mb.browser.min.js',
            'src/legacyscripts/plugin/smartclick/smartclick.js',
            'src/legacyscripts/plugin/datatables/jquery.dataTables-cust.min.js',
            'src/legacyscripts/plugin/datatables/ColReorder.min.js',
            'src/legacyscripts/plugin/datatables/FixedColumns.min.js',
            'src/legacyscripts/plugin/datatables/ColVis.min.js',
            'src/legacyscripts/plugin/datatables/ZeroClipboard.js',
            'src/legacyscripts/plugin/datatables/media/js/TableTools.min.js',
            'src/legacyscripts/plugin/datatables/DT_bootstrap.js',
            'src/legacyscripts/demo.js'
        ],
        css: [
            'vendor/bootstrap/dist/css/bootstrap.min.css',
            'vendor/angular-loading-bar/src/loading-bar.min.css',
            'vendor/font-awesome/css/font-awesome.min.css',
            'src/assets/styles/smartadmin-production.css',
            'src/assets/styles/smartadmin-skins.css',
            'src/assets/styles/demo.css',
            'src/assets/styles/style.css'
        ],
        assets: [
        ]
    },
    app_files: {
        js: [
            'src/common/**/*.module.js',
            'src/common/**/*.js',
			'!src/common/**/doc/*',
            'src/app/**/*.module.js',
            '!src/**/*.exclude.js',
            'src/app/**/*.js',
        ]
    }
};
