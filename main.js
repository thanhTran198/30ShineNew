var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var danhSachSinhVien = new DanhSachSinhVien();
var validate = new validation();
function ThemSinhvien() {
    //lấy dữ liệu từ người dùng nhập vào
    var masv = $('.maSV').value;
    var hoten = $('.HoTen').value;
    var cmnd = $('.CMND').value;
    var email = $('.Email').value;
    var sdt = $('.dienthoai').value;
    var loi = 0;
    //kiểm tra đầu vào dữ liệu có đúng không
    if(KiemTraDauVaoRong('.maSV', masv) === true) {
        loi++;
    };
    if(KiemTraDauVaoRong('.HoTen', hoten) === true) {
        loi++;
    };
    if(KiemTraDauVaoRong('.CMND', cmnd) === true) {
        loi++;
    };
    if(validate.KiemTraEmail(email)) {
        $('.Email').style.borderColor = 'red'
    }else {
        $('.Email').style.borderColor = 'green'
    };
    if(validate.KiemTraSoDT(sdt)) {
        $('.dienthoai').style.borderColor = 'green'
    }else {
        $('.dienthoai').style.borderColor = 'red'
    };
    if(loi > 0) {
        return;
    }
    //thêm sinh viên
    var sinhvien = new SinhVien(masv,hoten,cmnd,email,sdt)
    danhSachSinhVien.ThemSinhVien(sinhvien)
    CapNhatDanhSachSV(danhSachSinhVien)
}

function KiemTraDauVaoRong(clas, value) {
    console.log(clas, value)
    if(validate.kiemTraRong(value) === true) {
        $(clas).style.borderColor = "red"
    }else {
        $(clas).style.borderColor = "green"
    }
}

function CapNhatDanhSachSV (DanhSachSinhVien) {
    var listTableSV = $('.tbodySinhVien');
    listTableSV.innerHTML = ''; //xóa thẻ tr có trước đó

    var thongTinSV = DanhSachSinhVien.DSSV.length;
    for(var i = 0; i < thongTinSV; i++) {
        //lấy thông tin sinh viên từ trong mảng sinh viên
        var sv = danhSachSinhVien.DSSV[i];
        //tạo thẻ tr
        var trSinhVien = document.createElement('tr');
        //tạo các thẻ td và filter dữ liệu sinh viên thứ [i] vào
        var tdCheckBox = document.createElement('td');
        var tdMaSV = TaoTheTD('maSV',sv.masv);
        var tdHoTen = TaoTheTD('hoten',sv.hoten);
        var tdCMND = TaoTheTD('cmnd',sv.cmnd);
        var tdEmail = TaoTheTD('email',sv.email);
        var tdSoDT = TaoTheTD('sodt',sv.sdt);
        //append các td vào tr
        trSinhVien.appendChild(tdCheckBox);
        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdCMND);
        trSinhVien.appendChild(tdEmail);
        trSinhVien.appendChild(tdSoDT);
        //append cá tr vào tbodySinhVien
        listTableSV.appendChild(trSinhVien)
    }
}

function TaoTheTD(className, value) {
    var td = document.createElement('td');
    td.className = className;
    td.innerHTML = value;
    return td;
}
