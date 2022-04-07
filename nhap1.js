var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var danhsachsinhvien = new SINHVIEN()
function SINHVIEN() {
    this.DSSV = []
    this.THEMSINHVIEN =  function(themSV) {
        this.DSSV.push(themSV)
    }
    this.SUASINHVIEN = function(xoasv,suaSV) {
    }
    this.XOASINHVIEN = function(maSV) {
        this.DSSV.forEach((sv,index) => {
            if(sv.masv == maSV) {
                console.log(sv.masv)
                this.DSSV.splice(index, 1)
            }
        })
    }
}

function KiemTraHopLe(value) {
    if(value.trim() == '') {
        return false;
    }else {
        return true;
    }
}
// kiểm tra gmail người dùng nhập vào có hợp lên không
function KiemTraEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// kiểm tra sđt người dùng nhập vào có hợp lên không
function KiemTraSoDT(sdt) {
    const regExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return regExp.test(String(sdt).toLowerCase())
}

// lấy value của sinh viên
function ThemSinhvien() {
    const MASV = $('.maSV').value;
    const HOTEN = $('.HoTen').value;
    const CMND = $('.CMND').value;
    const EMAIL = $('.Email').value;
    const SODT = $('.dienthoai').value;
    const GENDERs = document.getElementsByName('gender')
    let GENDER 
    let loi = 0;


    if(KiemTraHopLe(MASV) == true) {
        $('.maSV').style.borderColor = 'green';
    }else {
        $('.maSV').style.borderColor = 'red';
        loi++;
    };
    if(KiemTraHopLe(HOTEN) == true) {
        $('.HoTen').style.borderColor = 'green';
    }else {
        $('.HoTen').style.borderColor = 'red';
        loi++;
    };
    if(KiemTraHopLe(CMND) == true) {
        $('.CMND').style.borderColor = 'green';
    }else {
        $('.CMND').style.borderColor = 'red';
        loi++;
    };
    if(KiemTraHopLe(EMAIL) == true && KiemTraEmail(EMAIL) == true) {
        $('.Email').style.borderColor = 'green';
    }else {
        $('.Email').style.borderColor = 'red';
        loi++;
    };
    if(KiemTraHopLe(SODT) == true && KiemTraSoDT(SODT) == true ){
        $('.dienthoai').style.borderColor = 'green';
    }else {
        $('.dienthoai').style.borderColor = 'red';
        loi++;
    };

    if($('.gender-check-male').checked === true) {
        GENDER = 'Nam'
        $('.gender-female').style.color = '#000'
        $('.gender-male').style.color = '#000'
    }else if($('.gender-check-female').checked === true) {
        GENDER = 'Nữ'
        $('.gender-female').style.color = 'red'
        $('.gender-male').style.color = 'red'
    }else {
        loi++
        $('.gender-female').style.color = 'red'
        $('.gender-male').style.color = 'red'
    }


    if(loi != 0) {
        return;
    }

    function addSINHVIEN(masv,hoten,cmnd,email,sodt,gender) {
        this.masv = MASV;
        this.hoten = HOTEN;
        this.cmnd = CMND;
        this.email = EMAIL;
        this.sodt = SODT;
        this.gender = GENDER;
    }

    var sinhvien = new addSINHVIEN(MASV, HOTEN, CMND, EMAIL, SODT, GENDER);
    danhsachsinhvien.THEMSINHVIEN(sinhvien);
    capnhatsinhvien(danhsachsinhvien);
}

function capnhatsinhvien () {
    var tbodysinhvien = $('.tbodySinhVien')
    tbodysinhvien.innerHTML = ''

    var thongtinsinhvien = danhsachsinhvien.DSSV.length
    for(var i = 0; thongtinsinhvien > i; i++) {
        var sv = danhsachsinhvien.DSSV[i]
        const trSinhVien = document.createElement('tr');
        trSinhVien.className = 'trSinhVien'
        
        //tạo các thẻ "td"
        // var tdCheckBox = document.createElement('td');
        const tdmsv = TaoTheTD('masv', sv.masv)
        const tdhoten = TaoTheTD('hoten', sv.hoten)
        const tdcmnd = TaoTheTD('cmnd', sv.cmnd)
        const tdemail = TaoTheTD('email', sv.email)
        const tdsodt = TaoTheTD('sdt', sv.sodt)
        const tdGender = TaoTheTD('gender-sv', sv.gender)
        const tdoption = document.createElement('td')
        tdoption.className = 'option-listsv'
        const optionDelete = document.createElement('button')
        optionDelete.innerText = 'xóa'
        optionDelete.className = 'delete-sv'
        const optionFix = document.createElement('button')
        optionFix.innerText = 'sửa'
        optionFix.className = 'fix-sv'
        tdoption.appendChild(optionDelete)
        tdoption.appendChild(optionFix)

        trSinhVien.appendChild(tdmsv)
        trSinhVien.appendChild(tdhoten)
        trSinhVien.appendChild(tdcmnd)
        trSinhVien.appendChild(tdemail)
        trSinhVien.appendChild(tdsodt)
        trSinhVien.appendChild(tdGender)
        trSinhVien.appendChild(tdoption)

        
        tbodysinhvien.appendChild(trSinhVien)
    }

    $('.maSV').value = '';
    $('.HoTen').value = '';
    $('.CMND').value = '';
    $('.Email').value = '';
    $('.dienthoai').value = '';
    $('.gender-check-male').checked = false
    $('.gender-check-female').checked = false
}

//hàm tạo thẻ "td"
function TaoTheTD(className, Name) {
    var td = document.createElement('td');
    td.className = className;
    td.innerHTML = Name;
    return td;
}

function SetStorage() {
    //chuyển đổi object mảng danh sách sinh viên thành chuỗi json
    var jsonDanhSachSinhVien = JSON.stringify(danhsachsinhvien.DSSV);
    //rồi đem chuỗi json lưu vào storage và đặt tên là DanhSachSV
    localStorage.setItem('DanhSachSV', jsonDanhSachSinhVien);
}

function GetStorage() {
    //lấy ra chuỗi json là mảng danhsachsinhvien thông qua tên DanhSachSV
    var jsonDanhSachSinhVien = localStorage.getItem('DanhSachSV');
    var MangDSSV = JSON.parse(jsonDanhSachSinhVien);
    danhsachsinhvien.DSSV = MangDSSV;
    capnhatsinhvien(danhsachsinhvien);
};

// sửa/xóa sinh viên
const tableListSV = $('.table-listsv')
tableListSV.onclick = function(e) {
    const tbodySinhVien = $('.tbodySinhVien')
    console.log(tbodySinhVien)
    function deleteSV() {
        for(var i = 0; i < e.path.length; i++) {
            if(e.path[i].className == 'trSinhVien') {
                const td = e.path[i].attributes.class.ownerElement.cells
                for(j=0; j < td.length; j++) {
                    if(td[j].classList == 'masv') {
                        danhsachsinhvien.XOASINHVIEN(td[j].innerText)
                        console.log(e.path[i])
                        tbodySinhVien.removeChild(e.path[i])
                    }
                }
            }
        }
    }
    if(e.target.innerText == 'xóa') {
        deleteSV()
        // for(var i = 0; i < e.path.length; i++) {
        //     if(e.path[i].className == 'trSinhVien') {
        //         tbodySinhVien.removeChild(e.path[i])
        //     }
        // }
    }else if(e.target.innerText == 'sửa'){
        for(var i = 0; i < e.path.length; i++) {
            if(e.path[i].className == 'trSinhVien') {
                const b = e.path[i].attributes.class.ownerElement.cells
                let yes = 0
                for(i=0; i < b.length; i++) {
                    const classItem = b[i].className
                    if(classItem == 'masv') {
                        $('.information__input.maSV').value = b[i].innerText
                        yes++
                    }else if(classItem == 'hoten'){
                        $('.information__input.HoTen').value = b[i].innerText
                        yes++
                    }else if(classItem == 'cmnd'){
                        $('.information__input.CMND').value = b[i].innerText
                        yes++
                    }else if(classItem == 'email'){
                        $('.information__input.Email').value = b[i].innerText
                        yes++
                    }else if(classItem == 'sdt'){
                        $('.information__input.dienthoai').value = b[i].innerText
                        yes++
                    }else if(classItem == 'gender-sv'){
                        if(b[i].innerHTML == 'Nam') {
                            $('.gender-check-male').checked = true
                            $('.gender-check-female').checked = false
                        }else if(b[i].innerHTML == 'Nữ') {
                            $('.gender-check-male').checked = false
                            $('.gender-check-female').checked = true
                        }
                    }
                    if(yes == 5) {
                        deleteSV()
                    }
                }
            }
        }
    }
}

function test123() {
   var check1 = document.getElementById('check1')
   var check2 = document.getElementById('check2')

//    console.log(check1)
   check1.setAttribute("class", "atribute1");
   check1.removeAttribute('checked')
    
}