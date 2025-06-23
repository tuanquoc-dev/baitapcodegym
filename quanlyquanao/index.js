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
    buttonGroup += `<button onclick="viewPurchaseInfo()">Xem mua hàng</button>`;
  }

  if (user.role === "viewer") {
    actionHeader = `<th>Mua</th>`;
  }

  buttonGroup += `<button onclick="logout()">Đăng xuất</button>`;

  let html = `
    <h1>🛍️ Quản Lý Quần Áo</h1>
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
      if (product.quantity > 0) {
        html += `<td><button onclick="buyProduct(${product.id})">Mua</button></td>`;
      } else {
        html += `<td><span style="color: red; font-weight: bold;">Hết hàng</span></td>`;
      }
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

  let users = JSON.parse(localStorage.getItem("users")) || []; //Lấy thông tin người dùng nhập vào

  let user = users.find(
    (u) => u.username === username && u.password === password && u.role === role // Lấy danh sách người dùng đăng kí từ localstorage.
  );

  if (!user) {
    alert("Sai thông tin đăng nhập!"); // Kiểm tra người dùng có tồn tại trong danh sách hay không(đúng tên, mật khẩu, role).
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
        <br>
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

  let users = JSON.parse(localStorage.getItem("users")) || []; // Lấy danh sách người dùng hiện tại

  // Nếu username đã tồn tại => báo
  let existed = users.find((u) => u.username === username);
  if (existed) {
    alert("Tài khoản đã tồn tại!");
    return;
  }

  //thêm người dùng mới vào danh sách vào localstorage.
  users.push({ username, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Đăng kí thành công!");
  navigateToLogin();
}

function buyProduct(id) {
  let products = myStore.getListProduct();
  let product = products.find(p => p.id === id);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  if (!currentUser || currentUser.role !== "viewer") {
    alert("Chỉ người dùng được phép mua.");
    return;
  }

  if (product.quantity <= 0) {
    alert("Sản phẩm đã hết hàng!");
    return;
  }

  // Giảm số lượng tồn kho
  product.quantity -= 1;
  myStore.update(product.id, product);

  // Lưu vào lịch sử mua
  let purchases = JSON.parse(localStorage.getItem("purchases")) || [];
  purchases.push({
    username: currentUser.username,
    productId: product.id,
    productName: product.name,
    price: product.price,
    size: product.size,
    image: product.image,
    quantity: 1,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("purchases", JSON.stringify(purchases));

  // Hiển thị hóa đơn ngay
  showBill(currentUser.username, product);
}

function viewPurchaseDetail(product, username) {
  document.getElementById("ux").innerHTML = `
    <h2>Thông tin sản phẩm đã mua</h2>
    <p><strong>Tài khoản:</strong> ${username}</p>
    <p><strong>Tên sản phẩm:</strong> ${product.name}</p>
    <p><strong>Ảnh:</strong><br><img src="${product.image}" width="150"></p>
    <p><strong>Size:</strong> ${product.size}</p>
    <p><strong>Giá:</strong> ${product.price} VND</p>
    <br>
    <button onclick="navigateToHomePage()">Quay lại</button>
  `;
}

function viewPurchaseInfo() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || user.role !== "admin") {
    alert("Chỉ admin mới được xem thông tin mua hàng.");
    return;
  }

  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

  if (purchases.length === 0) {
    document.getElementById(
      "ux"
    ).innerHTML = `<h2>Không có dữ liệu mua hàng</h2>`;
    return;
  }

  let html = `
    <h2>Thông Tin Mua Hàng</h2>
    <table border="1" style="width: 90%; margin: auto; border-collapse: collapse;">
      <tr style="background-color: #3498db; color: white;">
        <th>Tài khoản</th>
        <th>Tên sản phẩm</th>
        <th>Ảnh</th>
        <th>Size</th>
        <th>Giá</th>
        <th>Số lượng</th>
      </tr>
  `;

  purchases.forEach((p) => {
    html += `
      <tr>
        <td>${p.username}</td>
        <td>${p.productName}</td>
        <td><img src="${p.image}" width="100"></td>
        <td>${p.size}</td>
        <td>${p.price}</td>
        <td>${p.quantity}</td>
      </tr>
    `;
  });

  html += `</table><br><center><button onclick="navigateToHomePage()">Quay lại</button></center>`;
  document.getElementById("ux").innerHTML = html;
}

function showBill(username, product) {
  const billHTML = `
    <h2>Hóa đơn mua hàng</h2>
    <div id="bill-content" style="width: 300px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px #ccc;">
      <p><strong>Người mua:</strong> ${username}</p>
      <p><strong>Tên sản phẩm:</strong> ${product.name}</p>
      <p><strong>Size:</strong> ${product.size}</p>
      <p><strong>Giá:</strong> ${product.price.toLocaleString()} VND</p>
      <img src="${product.image}" style="width: 100px; height: auto; border-radius: 10px;">
      <p><strong>Ngày mua:</strong> ${new Date().toLocaleString()}</p>
    </div>
    <br>
    <div style="text-align: center;">
      <button onclick="exportBill()">Xuất bill PDF</button>
      <br>
      <button onclick="navigateToHomePage()">Trang chủ</button>
    </div>
  `;
  document.getElementById("ux").innerHTML = billHTML;
}

function exportBill() {
  const element = document.getElementById("bill-content");
  const opt = {
    margin: 0.5,
    filename: `hoa_don_${new Date().getTime()}.pdf`,
    // image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}



navigateToHomePage();
