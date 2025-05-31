
const slides = document.querySelector(".slides");
let index = 0;

function nextSlide() {
    index++;
    if (index >= slides.children.length) {
        index = 0;
    }
    slides.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(nextSlide, 4000); // Chuyển slide mỗi 4 giây

document.querySelectorAll(".brand-option").forEach(option => {
    option.addEventListener("click", () => {
        const selectedBrand = option.getAttribute("data-brand");
        const products = document.querySelectorAll(".product-card");

        products.forEach(product => {
            const productBrand = product.querySelector("h3").innerText.split(" ")[0]; // Lấy thương hiệu từ tên sản phẩm

            if (selectedBrand === "all" || productBrand === selectedBrand) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const brandContainer = document.getElementById("brand-filter-container");
    const brandCount = document.querySelectorAll(".brand-option").length;

    cartContainer.style.display = "none";
    // Nếu có ít hơn 5 logo, căn giữa
    if (brandCount < 15) {
        brandContainer.style.justifyContent = "center";
    } else {
        brandContainer.style.justifyContent = "flex-start"; // Cuộn ngang khi có nhiều logo
    }
});


document.querySelectorAll(".brand-option").forEach(option => {
    option.addEventListener("click", () => {
        const selectedBrand = option.getAttribute("data-brand");
        const filteredContainer = document.getElementById("filtered-products");
        const productList = filteredContainer.querySelector(".products");
        const brandTitle = document.getElementById("brand-title").querySelector("span");
        const allProductsSection = document.getElementById("all-products-section");

        // 🛠 Xóa toàn bộ danh sách sản phẩm cũ trước khi lọc
        productList.innerHTML = "";

        // ✅ Cập nhật tiêu đề thương hiệu
        brandTitle.textContent = selectedBrand;

        // ✅ Chỉ lấy sản phẩm từ **danh sách sản phẩm gốc**, tránh lặp
        const originalProducts = document.querySelectorAll(".product-list .product-card");

        originalProducts.forEach(product => {
            const productBrand = product.querySelector("h3").innerText.split(" ")[0];
            if (productBrand === selectedBrand) {
                productList.appendChild(product.cloneNode(true));
            }
        });

        // ✅ Hiển thị danh mục lọc và **ẩn mục "Tất cả sản phẩm"**
        filteredContainer.style.display = "block";
        allProductsSection.style.display = "none"; // Ẩn danh sách tất cả sản phẩm
        document.querySelector(".product-list").style.display = "none"; // Ẩn mục "Sản phẩm"
        document.getElementById("all-products-btn").style.display = "none"; // Ẩn nút "Tất cả sản phẩm"
    });
});






document.getElementById("back-to-home").addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang nếu là thẻ <a>

    const filteredContainer = document.getElementById("filtered-products");
    const allProductsSection = document.getElementById("all-products-section");
    const productList = document.querySelector(".product-list");
    const allProductsBtn = document.getElementById("all-products-btn");

    // 🛠 Xóa danh sách lọc và danh sách tất cả sản phẩm
    document.getElementById("filtered-products").querySelector(".products").innerHTML = "";
    document.getElementById("all-products-section").querySelector(".products").innerHTML = "";

    // ✅ Ẩn danh mục lọc & danh sách tất cả sản phẩm
    filteredContainer.style.display = "none";
    allProductsSection.style.display = "none";

    // ✅ Hiển thị lại **sản phẩm nổi bật**
    productList.style.display = "block";

    // ✅ Hiển thị lại nút "Tất cả sản phẩm"
    allProductsBtn.style.display = "block";

    // 🛠 Hiển thị lại tất cả sản phẩm nổi bật
    document.querySelectorAll(".product-card").forEach(product => {
        product.style.display = "block";
    });
});




document.getElementById("all-products-btn").addEventListener("click", () => {
    const allProductsSection = document.getElementById("all-products-section");
    const productList = allProductsSection.querySelector(".products");
    const products = document.querySelectorAll(".product-card");
    const allProductsBtn = document.getElementById("all-products-btn");

    // 🛠 Xóa danh sách cũ trước khi thêm sản phẩm mới
    productList.innerHTML = "";

    // Thêm lại toàn bộ sản phẩm vào danh sách
    products.forEach(product => {
        productList.appendChild(product.cloneNode(true));
    });

    // ✅ Hiển thị tất cả sản phẩm và ẩn "Sản phẩm nổi bật"
    allProductsSection.style.display = "block";
    document.querySelector(".product-list").style.display = "none";

    // ❌ Ẩn nút "Tất cả sản phẩm" sau khi được nhấn
    allProductsBtn.style.display = "none";
});

// 🛠 Khi quay về trang chủ, hiển thị lại nút "Tất cả sản phẩm"
document.getElementById("home-link").addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang nếu là thẻ <a>

    // 🛠 Xóa bộ lọc và reset sản phẩm
    document.getElementById("filtered-products").querySelector(".products").innerHTML = "";
    document.getElementById("all-products-section").querySelector(".products").innerHTML = "";

    // ✅ Hiển thị lại sản phẩm nổi bật
    document.getElementById("filtered-products").style.display = "none";
    document.getElementById("all-products-section").style.display = "none";
    document.querySelector(".product-list").style.display = "block";
    document.getElementById("all-products-btn").style.display = "block";

    // 🛠 Hiển thị lại tất cả sản phẩm
    document.querySelectorAll(".product-card").forEach(product => {
        product.style.display = "block";
    });

    // ✅ Reset bộ lọc về trạng thái ban đầu
    document.getElementById("brand-title").querySelector("span").textContent = "";

    // ✅ Đảm bảo nút giỏ hàng vẫn hoạt động
    document.getElementById("cart-container").style.display = "none";
});


document.getElementById("header-products-link").addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang

    const allProductsSection = document.getElementById("all-products-section");
    const productList = allProductsSection.querySelector(".products");
    const products = document.querySelectorAll(".product-list .product-card"); // Chỉ lấy sản phẩm từ danh sách chính

    // 🛠 Xóa danh sách cũ trước khi thêm mới để tránh nhân đôi
    productList.innerHTML = "";

    // ✅ Thêm lại toàn bộ sản phẩm vào danh sách
    products.forEach(product => {
        productList.appendChild(product.cloneNode(true));
    });

    // ✅ Hiển thị danh sách tất cả sản phẩm và ẩn "Sản phẩm nổi bật"
    allProductsSection.style.display = "block";
    document.querySelector(".product-list").style.display = "none";

    // ✅ Ẩn nút "Tất cả sản phẩm" (nếu cần)
    document.getElementById("all-products-btn").style.display = "none";
});


document.getElementById("header-products-link").addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang

    const allProductsSection = document.getElementById("all-products-section");
    const lastProduct = allProductsSection.querySelector(".products .product-card:last-child");

    if (lastProduct) {
        // ✅ Cuộn xuống đến sản phẩm cuối cùng để hiển thị toàn bộ danh sách
        lastProduct.scrollIntoView({ behavior: "smooth" });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const continueShoppingBtn = document.getElementById("continue-shopping");
    const checkoutBtn = document.getElementById("checkout");
    const cartContainer = document.getElementById("cart-container");
    const cartToggle = document.getElementById("cart-toggle");
    const blurOverlay = document.getElementById("blur-overlay");
    const cartCount = document.getElementById("cart-count"); // Số lượng sản phẩm trong giỏ

    // 🔄 Lấy giỏ hàng từ cookie khi tải trang
    let cart = getCookie("cart") || [];

    function saveCartToCookie() {
        setCookie("cart", cart, 7); // Lưu giỏ hàng vào cookie, giữ trong 7 ngày
    }

    // 🛒 Thêm sản phẩm vào giỏ hàng
    function addToCart(productName, productPrice) {
        cart = getCookie("cart") || []; // Luôn lấy giỏ hàng mới nhất từ cookie
        const itemIndex = cart.findIndex(item => item.name === productName);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        saveCartToCookie(); // Cập nhật cookie
        updateCartDisplay();
        updateCartCount(); // Cập nhật số lượng giỏ hàng
    }

    // ❌ Xóa sản phẩm
    function removeItem(index) {
        cart.splice(index, 1);
        saveCartToCookie();
        updateCartDisplay();
        updateCartCount(); // Cập nhật số lượng giỏ hàng
    }

    // ➕➖ Thay đổi số lượng sản phẩm
    function changeQuantity(index, amount) {
        if (cart[index]) {
            cart[index].quantity += amount;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            saveCartToCookie();
            updateCartDisplay();
            updateCartCount(); // Cập nhật số lượng giỏ hàng
        }
    }

    // 🔢 Cập nhật số lượng sản phẩm trên giỏ hàng header
    function updateCartCount() {
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalQuantity;
        cartCount.style.display = totalQuantity > 0 ? "inline-block" : "none"; 
    }

    // 🚀 Hiển thị giỏ hàng
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <p>${item.name} - ${item.quantity} x ${item.price.toLocaleString()}₫</p>
                <button class="decrease-qty" data-index="${index}">➖</button>
                <button class="increase-qty" data-index="${index}">➕</button>
                <button class="remove-item" data-index="${index}">❌ Xóa</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.quantity * item.price;
        });

        cartTotalPrice.innerText = `${totalPrice.toLocaleString()}₫`;

        
    }

    // 🛒 Tải giỏ hàng từ cookie khi tải trang
    updateCartDisplay();
    updateCartCount();

  


    // 🛍 Hiển thị giỏ hàng khi nhấn vào nút giỏ hàng trên header
    cartToggle.addEventListener("click", (event) => {
        event.preventDefault();
        const isVisible = cartContainer.style.display === "block";

        cartContainer.style.display = isVisible ? "none" : "block";
        blurOverlay.style.display = isVisible ? "none" : "block";
    });

    // 🔄 Ẩn giỏ hàng khi nhấn "Tiếp tục mua hàng"
    continueShoppingBtn.addEventListener("click", () => {
        cartContainer.style.display = "none";
        blurOverlay.style.display = "none";
    });

    // 💳 Sự kiện "Thanh toán"
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("🔔 Giỏ hàng của bạn đang trống!");
        } else {
            alert("💳 Bạn đang tiến hành thanh toán!");
        }
    });
    // === EVENT DELEGATION CHO NÚT THÊM VÀO GIỎ ===
document.addEventListener('click', function(e) {
    // Xử lý nút thêm vào giỏ
    if (e.target && e.target.classList.contains('add-to-cart')) {
        const button = e.target;
        const name = button.getAttribute("data-name");
        const price = parseInt(button.getAttribute("data-price"));
        
        if (!name || isNaN(price)) {
            console.error("❌ Lỗi: Không lấy được tên hoặc giá sản phẩm!");
            return;
        }
        
        addToCart(name, price);
        showCustomAlert(`✅ Đã thêm "${name}" vào giỏ hàng!`);
        return;
    }
    
    // Xử lý các nút khác trong giỏ hàng
    if (e.target && e.target.classList.contains('remove-item')) {
        const index = parseInt(e.target.getAttribute("data-index"));
        cart.splice(index, 1);
        saveCartToCookie();
        updateCartDisplay();
        updateCartCount();
        return;
    }
    
    if (e.target && e.target.classList.contains('increase-qty')) {
        const index = parseInt(e.target.getAttribute("data-index"));
        cart[index].quantity += 1;
        saveCartToCookie();
        updateCartDisplay();
        updateCartCount();
        return;
    }
    
    if (e.target && e.target.classList.contains('decrease-qty')) {
        const index = parseInt(e.target.getAttribute("data-index"));
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        saveCartToCookie();
        updateCartDisplay();
        updateCartCount();
        return;
    }
});
});

document.getElementById("view-cart").addEventListener("click", () => {
    window.location.href = "cart.html"; // Chuyển hướng sang trang giỏ hàng chi tiết
});

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
}

function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return JSON.parse(value);
    }
    return [];
}

function showCustomAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");

    if (!alertBox || !alertMessage) {
        console.error("❌ Lỗi: Không tìm thấy phần tử thông báo!");
        return;
    }

    alertMessage.innerText = message;
    alertBox.classList.add("show");

    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 3000); // Alert biến mất sau 3 giây
}



