let productNames = [];

function add() {
  let newData = document.getElementById("newProduct").value;
  productNames.push(newData);
  getAll();
  document.getElementById("newProduct").value = "";
}

function remove(index) {
  let isConfirm = confirm("Are u sure?");
  if (isConfirm) {
    productNames.splice(index, 1);
    getAll();
  }
}

function edit(index) {
    let newData = prompt("Enter new name " + productNames[index]);
    if (newData){
        productNames[index] = newData;
        getAll(); 
    }
}

function getAll() {
  let html = "";
  for (let i = 0; i < productNames.length; i++) {
    html += `
          <tr>
            <th>${productNames[i]}</th>
            <th><button onclick=edit(${i})>Edit</button></th>
            <th><button onclick=remove(${i})>Delete</button></th>
        </tr>
        `;
  }
  document.getElementById("data").innerHTML = html;
}

function search() {
    let searchProducts = ["iphone 17", "iphone 16", "iphone 15"];
    
}

getAll();


// Tạo 1 ô input cho phép người dùng tìm kiếm theo tên (Nên tạo 1 mảng mới chứa dữ liệu tìm kiếm)
// Tìm gần đúng
// Nhập đến đâu lọc dữ liệu đến đó
// Edit không đùng prompt mà dùng html
// Lưu dữ liệu (local storage)