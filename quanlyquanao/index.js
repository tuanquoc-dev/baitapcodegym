let myStore = new Store(1, "Sốp của Tuấn");
console.log("myStore", myStore);
navigateToHomePage();

function navigateToHomePage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    navigateToLogin();
    return;
  }

  let actionHeader = "";
  let addButton = "";

  if (user.role === "admin") {
    actionHeader = `<th colspan="2">Action</th>`;
  }

  let html = `
    <h2>Chào ${user.username} (${user.role})</h2>
    <div class="button-group">
        ${addButton}
        <button onclick="logout()">Đăng xuất</button>
    </div>
    <input type="text" placeholder="Tìm kiếm" id="search-input" oninput="search()">
    <input type="number" placeholder="Giá bắt đầu" id="price-start" oninput="search()">
    <input type="number" placeholder="Giá kết thúc" id="price-end" oninput="search()">
    <select id="size-filter" onchange="search()">
        <option value="">Tất cả size</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
    </select>
    <table border="1">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            ${actionHeader}
        </tr>
        <tbody id="ui"></tbody>
    </table>
  `;

  document.getElementById("ux").innerHTML = html;

  myStore.getDateInStorage();
  getAll(myStore.getListProduct());
}


function getAll(list) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  let html = "";

  for (let product of list) {
    html += `
      <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td><img src="${product.image}"></td>
          <td>${product.size}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
          ${
            user.role === "admin"
              ? `
              <td><button onClick="navigateToUpdate(${product.id})">Edit</button></td>
              <td><button onClick="deleteProduct(${product.id})">Delete</button></td>
          `
              : ""
          }
      </tr>
    `;
  }

  document.getElementById("ui").innerHTML = html;
}

function search() {
  let name = document.getElementById("search-input").value.toLowerCase().trim();
  let priceStart = +document.getElementById("price-start").value;
  let priceEnd = +document.getElementById("price-end").value;
  let size = document.getElementById("size-filter").value;

  if (!priceStart) {
    priceStart = -Infinity;
  }
  if (!priceEnd) {
    priceEnd = Infinity;
  }

  let list = myStore.getListSearch(name, priceStart, priceEnd, size);
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
        <input type="text" placeholder="Số lượng sản phẩm" id="quantity">
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
  let price = Number(document.getElementById("price").value);
  let quantity = Number(document.getElementById("quantity").value);

  let p = new Clothing(id, name, image, size, price, quantity);
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
  let quantity = document.getElementById("quantity").value;
  let p = new Clothing(id, name, image, size, price, quantity);
  myStore.update(id, p);
  navigateToHomePage();
}

function navigateToUpdate(id) {
  let product = myStore.getProductById(id);
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
        <input type="text" placeholder="Số lượng sản phẩm" id="quantity" value="${product.quantity}">
        <br>
        <br>
        <button onclick="updateProduct(${id})">Sửa</button>
        </div>
    `;
}

function navigateToLogin() {
  document.getElementById("ux").innerHTML = `
    <h2>Đăng nhập</h2>
    <div>
        <input type="text" id="username" placeholder="Tên đăng nhập">
        <br><br>
        <select id="role">
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
        </select>
        <br><br>
        <button onclick="login()">Đăng nhập</button>
    </div>
  `;
}

function login() {
  const username = document.getElementById("username").value.trim();
  const role = document.getElementById("role").value;

  if (!username) {
    alert("Vui lòng nhập tên đăng nhập!");
    return;
  }

  const user = {
    username: username,
    role: role,
  };

  localStorage.setItem("currentUser", JSON.stringify(user));
  navigateToHomePage();
}

function logout() {
  localStorage.removeItem("currentUser");
  navigateToLogin();
}

navigateToHomePage();
