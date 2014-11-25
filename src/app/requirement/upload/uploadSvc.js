angular
    .module('itms.requirement.upload')
    .factory('uploadSvc', ['common', uploadService]);

function uploadService(common){
    return {
        validate: validate
    };

    function validate(element){
        var ele = element[0];
        if (!ele.files
            || !ele.files[0])
            return "请选择上传文件";
        var file = ele.files[0];

        if (file.size > 2000000)
            return "文件太大";
        var extName = common.fileHelper.getExtName(file.name);
        if (extName != "xls" && extName != "xlsx")
            return "文件类型错误";
        return null;
    }

}
