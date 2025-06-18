let myStore = new Store(1, "Sốp của Tuấn");
console.log("myStore", myStore);
navigateToHomePage();

function navigateToHomePage() {
  document.getElementById("ux").innerHTML = `
    <h2>Danh sách sản phẩm</h2>
    <input type="text" placeholder="Tìm kiếm" id="search-input" oninput="search()">
    <input type="number" placeholder="Giá bắt đầu" id="price-start" oninput="search()">
    <input type="number" placeholder="Giá kết thúc" id="price-end" oninput="search()">
    <br>
    <br>
            <table border="1">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th colspan="2">Action</th>
                </tr>
         <tbody id="ui">       
         </tbody>
            </table>
    `;
  myStore.getDateInStorage();
  let list = myStore.getListProduct(); // Mảng product
  console.log("list", list);
  getAll(list);
}

function getAll(list) {
  let html = "";
  for (let i = 0; i < list.length; i++) {
    let product = list[i];
    html += `
               <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td><img src="${product.image}" alt=""></td>
                    <td>${product.size}</td>
                    <td>${product.price}</td>
                    <td><button onClick="navigateToUpdate(${product.id})">Edit</button></td>
                    <td><button onClick=" deleteProduct(${product.id})" >Delete</button></td>
                </tr>
        `;
  }
  document.getElementById("ui").innerHTML = html;
}

function search() {
  let nameSearch = document.getElementById("search-input").value;
  let priceStart = +document.getElementById("price-start").value;
  let priceEnd = +document.getElementById("price-end").value;
  if (!priceStart) priceStart = -Infinity;
  if (!priceEnd) priceEnd = Infinity;
  let list = myStore.getListSearch(nameSearch, priceStart, priceEnd);
  getAll(list);
}

function navigateToAdd() {
  document.getElementById("ux").innerHTML = `
        <h2>Thêm sản phẩm</h2>
        <div>
        <input type="text" placeholder="Tên sản phẩm" id="name">
        <br>
        <br>
        <input type="text" placeholder="Ảnh sản phẩm" id="image">
        <br>
        <br>
        <input type="text" placeholder="Size sản phẩm" id="size">
        <br>
        <br>
        <input type="text" placeholder="Giá sản phẩm" id="price">
        <br>
        <br>
        <button onclick=" addProduct()">Thêm</button>
        </div>
    `;
}

function addProduct() {
  let list = myStore.getListProduct();

  let id = list.length + 1;
  let name = document.getElementById("name").value;
  let image = document.getElementById("image").value;
  let size = document.getElementById("size").value;
  let price = document.getElementById("price").value;

  let p = new Clothing(id, name, image, size, price);
  myStore.addProduct(p);
  navigateToHomePage();
}

function deleteProduct(id) {
  let isConfirm = confirm("are u sure?");
  if (isConfirm) {
    myStore.remove(id);
    navigateToHomePage();
  }
}

function updateProduct(id) {
  let name = document.getElementById("name").value;
  let image = document.getElementById("image").value;
  let size = document.getElementById("size").value;
  let price = document.getElementById("price").value;
  let p = new Clothing(id, name, image, size, price);
  myStore.update(id, p);
  navigateToHomePage();
}

function navigateToUpdate(id) {
  // hiển hị dữ liệu cũ
  let product = myStore.getProductById(id); // new Product(1, "Bánh mì", 3000, 30);
  document.getElementById("ux").innerHTML = `
        <h2>Thêm sản phẩm</h2>
        <div>
        <input type="text" placeholder="Tên sản phẩm" id="name" value="${product.name}">
        <br>
        <br>
        <input type="text" placeholder="Ảnh sản phẩm" id="image" value="${product.image}">
        <br>
        <br>
        <input type="text" placeholder="Size sản phẩm" id="size" value="${product.size}">
        <br>
        <br>
        <input type="text" placeholder="Giá sản phẩm" id="price" value="${product.price}">
        <br>
        <br>
        <button onclick="updateProduct(${id})">Sửa</button>
        </div>
    `;
}

navigateToHomePage();
