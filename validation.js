
function validation(value) {
    this.kiemTraRong = function (value) {
        if(value.trim() === "") {
            return true;
        } else {
            return false;
        }
    }

    //kiểm tra email hợp lệ không
    this.KiemTraEmail = function (value) {
        var atposition = value.indexOf("@");
        var dotposition = value.lastIndexOf(".");
        if (atposition < 1 || dotposition < (atposition + 2)
                || (dotposition + 2) >= value.length) {
            return true;
        }else {
            return false;
        }
    }
    
    //kiểm tra số điện thoai có hợp lệ không
    this.KiemTraSoDT = function (value)
    {
        var re = /^\d+$/;
        var valueLength = value.length;
        if(re.test(value) && valueLength >=10 && valueLength <=11)
        {
            return true;
        }
        return false;
    }
}

