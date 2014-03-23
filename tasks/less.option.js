module.exports = {
    dev: {
        options: {
//                    compress: true,
//                    yuicompress: true,
//                    optimization:2,
            paths: ["app/vendor/bootstrap/less", "app/less"]
//                    cleancss: true
        },
        files: {
            'app/styles/style.css': ['app/less/*.less']
        }
    }
}