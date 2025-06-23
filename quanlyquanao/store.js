class Store {
  id;
  name;
  listProduct;

  constructor(id, name) {
    this.listProduct = [];
    this.id = id;
    this.name = name;
  }

  getListSearch(nameSearch, priceStart, priceEnd, sizeFilter) {
    let listOutput = [];

    // Bước 1: lọc theo tên
    for (let i = 0; i < this.listProduct.length; i++) {
      let product = this.listProduct[i];
      let productName = product.name.toLowerCase();
      let searchName = nameSearch.toLowerCase();

      if (productName.includes(searchName)) {
        listOutput.push(product);
      }
    }

    // Bước 2: lọc theo giá
    let listOutput2 = [];
    for (let i = 0; i < listOutput.length; i++) {
      let product = listOutput[i];
      let price = Number(product.price); // ép kiểu giá về số
      if (price >= priceStart && price <= priceEnd) {
        listOutput2.push(product);
      }
    }

    // Bước 3: lọc theo size
    let listOutput3 = [];

    if (sizeFilter === "") {
      listOutput3 = listOutput2;
    } else {
      for (let i = 0; i < listOutput2.length; i++) {
        let product = listOutput2[i];
        if (product.size === sizeFilter) {
          listOutput3.push(product);
        }
      }
    }

    return listOutput3;
  }

  getListProduct() {
    return this.listProduct;
  }

  addProduct(newProduct) {
    this.listProduct.push(newProduct);
    this.saveDataInStorage();
  }

  remove(id) {
    let index = -1;
    for (let i = 0; i < this.listProduct.length; i++) {
      let p = this.listProduct[i];
      if (p.id == id) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      alert("Không có sản phẩm ");
    } else {
      this.listProduct.splice(index, 1);
    }
    this.saveDataInStorage();
  }

  getProductById(id) {
    for (let i = 0; i < this.listProduct.length; i++) {
      let p = this.listProduct[i];
      if (id == p.id) {
        return p;
      }
    }
  }

  update(id, newProduct) {
    let index = -1;
    for (let i = 0; i < this.listProduct.length; i++) {
      let p = this.listProduct[i];
      if (p.id == id) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      alert("Không có sản phẩm ");
    } else {
      this.listProduct[index] = newProduct;
    }
    this.saveDataInStorage();
  }

  saveDataInStorage() {
    localStorage.setItem("listProduct", JSON.stringify(this.listProduct));
  }

  getDateInStorage() {
    let data = localStorage.getItem("listProduct"); // null or chuỗi data
    if (data) {
      // "[{...}, {...}]" => [{...}, {...}]
      this.listProduct = JSON.parse(data);
    } else {
      this.listProduct = [];
      this.saveDataInStorage();
    }
  }
}
