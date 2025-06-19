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
  let buttonGroup = "";

  if (user.role === "admin") {
    actionHeader = `<th colspan="2">Action</th>`;
    buttonGroup += `<button onclick="navigateToAdd()">Thêm mới</button>`;
  }

  if (user.role === "viewer") {
    actionHeader = `<th>Mua</th>`;
  }

  buttonGroup += `<button onclick="logout()">Đăng xuất</button>`;

  let html = `
    <button onclick="navigateToHomePage()">Trang chủ</button>
    <h2>Chào ${user.username} (${user.role})</h2>
    <div class="button-group">
        ${buttonGroup}
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
          `;

    if (user.role === "admin") {
      html += `
              <td><button onClick="navigateToUpdate(${product.id})">Edit</button></td>
              <td><button onClick="deleteProduct(${product.id})">Delete</button></td>
          `;
    } else if (user.role === "viewer") {
      html += `
            <td><button onclick="buyProduct(${product.id})">Mua</button></td>
       `;
    }

    html += `</tr>`;
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
  <button onclick="navigateToHomePage()">Trang chủ</button>
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
        <input type="password" id="password" placeholder="Mật khẩu">
        <br><br>
        <select id="role">
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
        </select>
        <br><br>
       <div class="button-login-group">
         <button onclick="login()">Đăng nhập</button>
         <button onclick="navigateToRegister()">Đăng ký</button>
       </div>
    </div>
  `;
}

function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  let role = document.getElementById("role").value;

  if (!username || !password) {
    alert("Vui lòng nhập tên và mật khẩu!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(
    (u) => u.username === username && u.password === password && u.role === role
  );

  if (!user) {
    alert("Sai thông tin đăng nhập!");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  navigateToHomePage();
}

function logout() {
  localStorage.removeItem("currentUser");
  navigateToLogin();
}

function navigateToRegister() {
  document.getElementById("ux").innerHTML = `
    <h2>Đăng kí tài khoản</h2>
    <div>
        <input type="text" id="reg-username" placeholder="Tên đăng nhập">
        <br><br>
        <input type="password" id="reg-password" placeholder="Mật khẩu">
        <br><br>
        <select id="reg-role">
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
        </select>
        <br><br>
        <button onclick="register()">Đăng kí</button>
        <button onclick="navigateToLogin()">Quay lại</button>
    </div>
  `;
}

function register() {
  let username = document.getElementById("reg-username").value.trim();
  let password = document.getElementById("reg-password").value.trim();
  let role = document.getElementById("reg-role").value;

  if (!username || !password) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let existed = users.find((u) => u.username === username);
  if (existed) {
    alert("Tài khoản đã tồn tại!");
    return;
  }

  users.push({ username, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Đăng kí thành công!");
  navigateToLogin();
}


function buyProduct(id) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Vui lòng đăng nhập trước khi mua hàng.");
    navigateToLogin();
    return;
  }

  const product = myStore.getListProduct().find(p => p.id == id);
  if (!product) {
    alert("Không tìm thấy sản phẩm.");
    return;
  }

  let html = `
    <h2>Thông tin sản phẩm đã mua</h2>
    <p><strong>Người mua:</strong> ${user.username}</p>
    <p><strong>Tên sản phẩm:</strong> ${product.name}</p>
    <p><strong>Ảnh:</strong><br><img src="${product.image}" width="150" style="border-radius: 8px;"></p>
    <p><strong>Size:</strong> ${product.size}</p>
    <p><strong>Giá:</strong> ${product.price} VND</p>
    <button onclick="navigateToHomePage()">Quay lại</button>
  `;

  document.getElementById("ux").innerHTML = html;
}

navigateToHomePage();
