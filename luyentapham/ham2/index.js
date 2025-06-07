/*
Bài 1:
Tính bình phương:
Viết hàm tính bình phương của một số bất kỳ được đưa vào.
Gọi và kiểm tra hàm vừa viết.
*/

// function binhPhuong(a) {
//   let result = a * a;
//   alert("Bình phương của số đó là: " + result);
// }
// let a = +prompt("Nhập a: ");
// binhPhuong(a);

/*
Bài 2: 
Tính diện tích và chu vi hình tròn:
Viết hàm tính diện tích hình tròn.
Viết hàm tính chu vi hình tròn.
Gọi và kiểm tra các hàm vừa viết.
*/

// function chuVi (r) {
//     let C = 2 * 3.14 * r;
//     alert("Chu vi hình tròn là: " + C);
// }

// let r = +prompt("Nhập bán kính: ");
// chuVi(r);

// function dienTich (r) {
//     let S = r * r * 3.14;
//     alert("Diện tích hình tròn là: " + S);
// }
// dienTich(r);

/*
Bài 3:
Tính giai thừa:
Viết hàm tính giai thừa của một số nguyên bất kỳ được đưa vào.
Gọi và kiểm tra hàm vừa viết.
*/

// function giaiThua (num) {
//     let ketQua = 1;
//     for (let i = 1; i <= num; i++){
//         ketQua *= i;
//     }
//     return ketQua;
// }

// console.log(giaiThua(5));

/*
Bài 4:
Kiểm tra ký tự số:
Viết hàm kiểm tra xem ký tự nhập vào có phải là ký tự số hay không.
Nếu là ký tự số, hàm trả về true; ngược lại trả về false.
*/

// function kTraKyTuSo (kiTu) {
//     if (!isNaN(kiTu)){
//         return true
//     }else {
//         return false;
//     }

// }

// console.log(kTraKyTuSo("hh"));
// console.log(kTraKyTuSo(5));

/*
Bài 5:
Tìm số nguyên nhỏ nhất:
Viết hàm nhận vào 3 số nguyên bất kỳ, trả về số nguyên có giá trị nhỏ nhất.
*/

// function timSoNguyen(a, b, c) {
//   if (a < b && a < c) {
//     return ("Số nguyên nhỏ nhất là: " + a);
//   }
//   if (b < a && b < c) {
//     return ("Số nguyên nhỏ nhất là: " + b);
//   }
//   if (c < a && c < b) {
//     return ("Số nguyên nhỏ nhất là: " + c);
//   }

// }

// alert(timSoNguyen(5,6,7));
// alert(timSoNguyen(5,4,7));
// alert(timSoNguyen(5,4,2));

/*
Bài 6:
Kiểm tra số nguyên dương:
Viết hàm nhận vào một số, kiểm tra xem số đó có phải là số nguyên dương không.
Nếu là nguyên dương, trả về true; ngược lại trả về false.
*/

// function kTraSoNguyenDuong (n) {
//     if (Number.isInteger(n) && n > 0){
//         return true;
//     }else {
//         return false;
//     }
// }

// console.log(kTraSoNguyenDuong(6));
// console.log(kTraSoNguyenDuong("tuan"));
// console.log(kTraSoNguyenDuong(-4));

/*
Bài 7:
Đổi chỗ hai số nguyên:
Viết hàm truyền vào 2 số nguyên bất kỳ và thực hiện đổi chỗ hai số đó.
*/

// function doiChoHaiSo(a, b) {
//     return [b, a];
// }

// let so1 = 7;
// let so2 = 9;

// console.log("Trước khi đổi: ", so1, so2);

// [so1, so2] = doiChoHaiSo(so1, so2);

// console.log("Sau khi đổi: ", so1, so2);

/*
Bài 8:
Đảo ngược mảng:
Viết hàm nhận vào một mảng số nguyên bất kỳ và đảo ngược mảng đó.
*/


// function daoMang(arr) {
//   let mangDao = [];

//   for (let i = arr.length - 1; i >= 0; i--) {
//     mangDao.push(arr[i]);
//   }
//   return mangDao;
// }

// const mangGoc = [1, 2, 3, 4, 5];
// const mangDaoNguoc = daoMang(mangGoc);

// console.log("Mảng gốc:", mangGoc);
// console.log("Mảng đảo ngược:", mangDaoNguoc);



/*
Bài 9:
Kiểm tra ký tự trong mảng:
Viết hàm nhận vào một mảng ký tự và một ký tự bất kỳ.
Kiểm tra xem ký tự đó có nằm trong mảng hay không.
Nếu có, trả về số lần xuất hiện; nếu không, trả về -1.
*/


// function kTraKyTu (word) {
//     let count = 0;
//     for (let i = 0; i < arr.length; i++){
//         if (word == arr[i]){
//             count++;
        
//         }
//     }

//     if (count > 0){
//         return count;
//     }else {
//         return -1;
//     }
// }

// let arr = ["-", "-" , "hai" , 4];
// console.log(kTraKyTu("-"));
// console.log(kTraKyTu("ba"));
