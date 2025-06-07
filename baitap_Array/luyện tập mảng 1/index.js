// Bài 1: Viết chương trình khởi tạo một mảng số nguyên gồm 10 phần tử. 
// Chương trình thực hiện tính và hiển thị xem có bao nhiêu số nguyên lớn hơn hoặc bằng 10:

// let numbers = [5, 12, 8, 15, 3, 20, 9, 10, 2, 18];
// let count = 0;
// for (let i = 0; i < numbers.length; i++){
//     if (numbers[i] >= 10){
//         count ++;
//     }
// }
// console.log(`Vậy có ${count} số nguyên lớn hơn bằng 10.`);


// Bài 2: Viết chương trình khởi tạo một mảng số nguyên gồm 10 phần tử khác nhau. 
// Chương trình hiển thị phần tử có giá trị lớn nhất trong mảng và vị trí của phần tử đó.

// let numbers = [5, 12, 8, 15, 3, 20, 9, 10, 2, 18];
// let max = numbers[0];
// let position = 0;
// for (let i = 0; i < numbers.length; i++){
//     if (numbers[i] > max){
//         max = numbers[i];
//         position = i;
//     }
// }
// console.log("Giá trị lớn nhất trong mảng:" + max);
// console.log("Vị trí của phần tử trong mảng:" + position);

// Bài 3: Viết chương trình khởi tạo một mảng số nguyên. Hiển thị giá trị lớn nhất trong mảng đó. 
// In ra giá trị trung bình của các phần tử trong mảng.


// let numbers = [5, 12, 8, 15, 3, 20, 9, 10, 2, 18];
// let max = numbers[0];
// let sum = 0;
// for (let i = 0; i < numbers.length; i++){
//     if (numbers[i] > max){
//         max = numbers[i];
//     }
//     sum += numbers[i];
// }
// let average = sum / numbers.length;

// console.log("Giá trị lớn nhất trong mảng là:" + max);
// console.log("Giá trị trung bình của các phần tử là:" + average);

// Bài 5: Viết chương trình đếm số nguyên âm trong một chuỗi:


// let input = "12 -5 7 -8 0 3 -1 9";
// let parts = input.split(" ");
// let count = 0;

// for(let i = 0; i < parts.length; i++){
//     let number = parseInt(parts[i]);
//     if(number < 0){
//         count++;
//     }
// }
// console.log("Số nguyên âm trong 1 chuỗi là: " + count);


/*
Bài 6:
Viết chương trình khởi tạo hoặc nhập vào một mảng số nguyên gồm 10 phần tử.
Nhập hoặc tạo một phần tử số nguyên V. 
Chương trình tìm xem V có nằm trong mảng không.

Nếu V thuộc mảng, in ra: "V is in the array".
Nếu không, in ra: "V is not in the array".

*/

// let number = [3, 7, 12, 5, 9, 21, 1, 8, 14, 6];
// let V = +prompt("Nhập N: ");
// let found = false
// for (let i = 0; i < number.length; i++){
//     if (number[i] == V){
//         found = true
//         break;
//     }
// }
// if (found) {
//   alert("V is in the array");
// } else {
//   alert("V is not in the array");
// }


/* 
Bài 7:
Viết chương trình khởi tạo hoặc nhập vào một mảng số nguyên gồm 10 phần tử. 
Nhập hoặc tạo một phần tử số nguyên V. 
Chương trình kiểm tra xem V có thuộc mảng đã cho không.

Nếu V thuộc mảng, xóa V khỏi mảng (dịch các phần tử bên phải V sang vị trí của V và gán 0 cho phần tử cuối cùng của mảng).
*/ 



// Khởi tạo mảng gồm 10 số nguyên
// let number = [3, 7, 12, 5, 9, 21, 1, 8, 14, 6];

// // Nhập số nguyên V cần kiểm tra
// let V = +prompt("Nhập số nguyên V:");

// // Tìm vị trí của V trong mảng
// let index = -1;

// for (let i = 0; i < number.length; i++) {
//   if (number[i] === V) {
//     index = i;
//     break;
//   }
// }

// // Nếu tìm thấy V thì xóa nó bằng cách dịch mảng
// if (index !== -1) {
//   // Dịch các phần tử bên phải sang trái
//   for (let j = index; j < number.length - 1; j++) {
//     number[j] = number[j + 1];
//   }

//   // Gán 0 cho phần tử cuối cùng
//   number[number.length - 1] = 0;

//   console.log("Mảng sau khi xóa V:", number);
// } else {
//   console.log("V không có trong mảng.");
// }


/* 
Bài 8:
Viết chương trình khởi tạo hoặc nhập vào một mảng số nguyên gồm 10 phần tử. 
-Chương trình sắp xếp mảng theo thứ tự giảm dần 
-hiển thị mảng đã được sắp xếp.
*/

// let arr = [3, 7, 1, 9, 5, 10, 2, 8, 6, 4];
// arr.sort(function(a,b){ // .sort(): Sắp xếp mảng  || function(a, b)	Hàm so sánh hai phần tử
//     return b-a;// Sắp xếp theo thứ tự giảm dần
// })
// console.log(arr);

/*
Bài 9
Viết chương trình khởi tạo hoặc nhập vào hai mảng số nguyên gồm 10 phần tử (gọi là mảng a và b).

Tạo mảng c gồm 20 phần tử.
Chương trình sẽ lưu các phần tử được nối từ hai mảng b và a vào mảng c.
Hiển thị mảng c.
*/

// let a = [3, 7, 1, 9, 5, 10, 2, 8, 6, 4];
// let b = [5, 12, 8, 15, 3, 20, 9, 10, 2, 18];

// let c = a.concat(b);
// console.log(c);


// Cho một mãng [1,7,5,9,2,6]
// let numbers = [1,7,5,9,2,6];
// - In ra các phần tử trong mảng:

// for(let i = 0; i < numbers.length; i++){
//     console.log(numbers[i]);
// }

// - In ra các phần tử chẵn trong mảng:

// for(let i = 0; i < numbers.length; i++){
//     if (numbers[i] % 2 == 0){
//         console.log(numbers[i]);
//     }
// }

// - In ra các phần tử tại vị trí chẵn trong mảng:

// for(let i = 0; i < numbers.length; i++){
//     if (i % 2 == 0){
//         console.log(numbers[i]);
//     }
// }

// - In ra tổng các phần tử chẵn trong màng:
// let tongChan = 0;
// for(let i = 0; i < numbers.length; i++){
//     if (numbers[i] % 2 == 0){
//         tongChan += numbers[i];
//     }
// }
// console.log(tongChan);
// - In ra tổng các phần từ >10 trong máng:

// let a = [1,2,34,45,67,9,11];
// let tong = 0;

// for (let i = 0; i < a.length; i++){
//     if (a[i] > 10){
//         tong+= a[i];
//     }
// }
// console.log(tong);

// - In ra tổng các phần tử chia 7 dư 2 trong màng:

// let sum = 0;

// for (let i = 0; i < numbers.length; i++){
//     if (numbers[i] % 7 == 2){
//         sum += numbers[i];
//     }
// }
// console.log(sum);
// - In ra max của các phần tử chẵn màng:

// let max = 0;

// for(let i = 0; i < numbers.length; i++){
//     if(numbers[i] % 2 == 0){
//         if (numbers[i] > max)
//             max = numbers[i];
//     }
// }
// console.log(max);
// - In ra lớn nhất của mảng:

// let max = 0;

// for(let i = 0; i < numbers.length; i++){
//         if (numbers[i] > max){
//             max = numbers[i];
//     }
// }
// console.log(max);

// - In ra số lượng các phần tử chia hết cho 5 trong màng:

// let count = 0;

// for (let i = 0; i < numbers.length; i++){
//     if(numbers[i] % 5 == 0){
//         count++;
//     }
// }
// console.log("Số lượng các phần tử chia hết cho 5 là:" + count);
// - In ra trung bình các phần tử chia hết cho 5 trong màng:

// let b = [1,7,5,9,2,6,15];
// let sum = 0;
// let count = 0;

// for(let i = 0; i < b.length; i++){
//     if(b[i] % 5 == 0){
//         sum += b[i];
//         count++;
//     }
// }
// let tb = sum / count;
// console.log(tb);

// - * Tìm phần tử lớn thứ 2 trong màng (nâng cao: 1 vòng lặp)
// let numbers = [1,7,5,9,2,6];
// let max_1 = numbers[0];

// for(let i = 0; i < numbers.length; i++){
//     if(numbers[i] > max_1){
//         max_1 = numbers[i];
//     }
// }
// let max_2 = - Infinity;
// for(let i = 0; i < numbers.length; i++){
//     if(numbers[i] > max_2 && numbers[i] < max_1){
//         max_2 = numbers[i];
//     }
// }
// console.log(max_2);


// Mảng 1 chiều
// let arr = [1,2,3];
// Mảng 2 chiều: các phần tử bên trong sẽ là mảng con
let arr2 = [
   //0 1 2 
    [1,2,3],//0
    [4,5,6],//1
    [7,8,9]//2
]
// console.log(arr2[2][0]);// đầu tiên là in ra mảng [7,8,9] => in ra số 7

for(let i = 0; i < arr2.length; i++){
    for(let j = 0; j < arr2[i].length; j++){
        console.log(arr2[i][j]);
    }
}
