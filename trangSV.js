var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var danhsachsinhvien = new SINHVIEN();
function SINHVIEN() {
    this.DSSV = []
    this.THEMSINHVIEN = function (themSV) {
        this.DSSV.push(themSV)
    }
    this.SUUASINHVIEN = function (suaSV) {

    }
    this.XOASINHVIEN = function (xoaSV) {

    }
}


//hàm kiểm tra người dùng có nhập value vào input không.
function KiemTraDauVao(value, className) {
    if(value.trim() == '') {
        $(className).style.borderColor = 'red';
        return false;
    }else {
        $(className).style.borderColor = 'green';
        return true;
    }
}

//kiểm tra email
function KTEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//kiểm tra sđt
function KTsdt(DIENTHOAI) {
    var regExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return regExp.test(String(DIENTHOAI).toLowerCase());
}

function ThemSinhvien() {
    //lấy ra các value mà người dùng nhập vào
    var MASV = $('.maSV').value;
    var HOTEN = $('.HoTen').value;
    var CMND = $('.CMND').value;
    var EMAIL = $('.Email').value;
    var DIENTHOAI = $('.dienthoai').value;
    var loi = 0;

    //kiểm tra người dùng có nhập value không
    if(KiemTraDauVao(MASV,'.maSV') == false) {
        loi++;
    }
    if(KiemTraDauVao(HOTEN,'.HoTen') == false) {
        loi++;
    }
    if(KiemTraDauVao(CMND,'.CMND') == false) {
        loi++;
    }
    if(KTEmail(EMAIL) == false) {
        $('.Email').style.borderColor = 'red';
        loi++;
    }else {KiemTraDauVao(EMAIL,'.Email')}
    if(KTsdt(DIENTHOAI) == false) {
        $('.dienthoai').style.borderColor = 'red';
        loi++;
    }else {KiemTraDauVao(DIENTHOAI,'.dienthoai')}
    if(loi != 0) {
        alert('Ồ! có lỗi rồi. vui lòng kiểm tra lại mọi thông tin bạn nhập vào nhé')
        return;
    }

    function addSV(masv,hoten,cmnd,email,dienthoai) {
        this.masv = MASV;
        this.hoten = HOTEN;
        this.cmnd = CMND;
        this.email = EMAIL;
        this.dienthoai = DIENTHOAI;
    }

    var SinhVien = new addSV(MASV,HOTEN,CMND,EMAIL,DIENTHOAI);
    danhsachsinhvien.THEMSINHVIEN(SinhVien);
    capnhatsinhvien(danhsachsinhvien);
}


function capnhatsinhvien(danhsachsinhvien) {
    var tbodySV = $('.tbodySinhVien');
    tbodySV.innerHTML = '';

    for(var i = 0; i < danhsachsinhvien.DSSV.length; i++) {
        var sv = danhsachsinhvien.DSSV[i];
        var trSV = document.createElement('tr')
        //tạo thẻ td
        var checkbox = document.createElement('td');
        var tdmsv = TaoTheTD('masv',sv.masv)
        var tdhoten =  TaoTheTD('hoten',sv.hoten)
        var tdcmnd =  TaoTheTD('cmnd',sv.cmnd)
        var tdemail =  TaoTheTD('email',sv.email)
        var tddienthoai =  TaoTheTD('dienthoai',sv.dienthoai)
        
        //add thẻ td vào tr
        trSV.appendChild(checkbox)
        trSV.appendChild(tdmsv)
        trSV.appendChild(tdhoten)
        trSV.appendChild(tdcmnd)
        trSV.appendChild(tdemail)
        trSV.appendChild(tddienthoai)

        tbodySV.appendChild(trSV)

    }
}

function TaoTheTD (className, dataSV) {
    var theTD = document.createElement('td')
    theTD.className = className;
    theTD.innerHTML = dataSV
    return theTD
}