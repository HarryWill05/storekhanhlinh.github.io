document.addEventListener("DOMContentLoaded", () => {
    // Lấy tham số từ URL
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("product-name");

    // Danh sách sản phẩm (có thể thay bằng API hoặc JSON)
    const products = {
        "nike-air-force-1": {
            name: "Nike Air Force 1",
            image: "https://giaysneakerhcm.com/wp-content/uploads/2021/07/giay-nike-air-force-1-low-white-brown-vet-nau-rep-1-1.jpg",
            price: 2500000
        },
        "vans-old-skool": {
            name: "Vans Old Skool",
            image: "https://product.hstatic.net/1000382698/product/upload_22d0981f85a34de0b2882340cb38e7c8_master.jpg",
            price: 1200000
        },

        "adidas-stan-smith": {
            name: "Adidas Stan Smith",
            image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4edaa6d5b65a40d19f20a7fa00ea641f_9366/Giay_Stan_Smith_trang_M20325_01_standard.jpg",
            price: 2000000
        },

        "converse-chunk-70": {
            name: "Converse Chunk 70",
            image: "https://www.converse.vn/media/catalog/product/0/8/0882-CONA00916C005003-1.jpg",
            price: 1800000
        },

        "nike-dunk-low": {
            name: "Nike Dunk Low",
            image: "https://product.hstatic.net/1000361048/product/dd1391_104_c_f3e15e398fe44a6ab05e23396168ccc9_master.jpg",
            price: 3200000
        },

        "adidas-superstar": {
            name: "Adidas Superstar",
            image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_00_standard.jpg",
            price: 1900000
        },

        "biti's-hunter-nam": {
            name: "Biti's Hunter Nam",
            image: "https://cdn.chiaki.vn/unsafe/0x960/left/top/smart/filters:quality(75)/https://chiaki.vn/upload/product/2024/05/giay-the-thao-nam-biti-s-hunter-x-liteplex-dsmh09800-den-39-p114298-664b0ed214a9d-20052024155026.png",
            price: 800000
        },

        "converse-all-star-low": {
            name: "Converse All Star Low",
            image: "https://product.hstatic.net/200000265619/product/121178-1_7ae11c7ec1b44e70b4689c4c3f063087_1024x1024.jpg",
            price: 1200000
        },

        "vans-knu-skool": {
            name: "Vans Knu Skool",
            image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/140/774/products/giay-vans-knu-skool-black-true-white-vn0009qc6bt-1.jpg?v=1726130441123",
            price: 2160000
        },

        "biti's-hunter-nu": {
            name: "Biti's Hunter Nu",
            image: "https://salt.tikicdn.com/ts/product/b7/86/b2/d91e4a82165051d4cfc04c36623891b3.jpg",
            price: 620000
        },
    };

    if (productName && products[productName]) {
        document.getElementById("product-name").innerText = products[productName].name;
        document.getElementById("product-image").src = products[productName].image;
        document.getElementById("product-price").innerText = `Giá: ${products[productName].price.toLocaleString()}₫`;
        

        // Cập nhật nút "Thêm vào giỏ" với dữ liệu sản phẩm
        const addToCartButton = document.getElementById("add-to-cart");
        addToCartButton.setAttribute("data-name", products[productName].name);
        addToCartButton.setAttribute("data-price", products[productName].price);
    } else {
        document.getElementById("product-detail-container").innerHTML = "<h2>Không tìm thấy sản phẩm</h2>";
    }

    // Sự kiện khi nhấn nút "Thêm vào giỏ hàng"
    const addToCartButton = document.getElementById("add-to-cart");
    if (addToCartButton) {
        addToCartButton.addEventListener("click", () => {
            const name = addToCartButton.getAttribute("data-name");
            const price = parseInt(addToCartButton.getAttribute("data-price"));

            if (!name || isNaN(price)) {
                console.error("❌ Lỗi: Không lấy được tên hoặc giá sản phẩm!");
                return;
            }

            addToCart(name, price);

            // Hiển thị thông báo sau khi thêm vào giỏ hàng
            showCustomAlert(`✅ Đã thêm "${name}" vào giỏ hàng!`);
        });
        const name = addToCartButton.getAttribute("data-name");
        const price = parseInt(addToCartButton.getAttribute("data-price"));
        if (addToCartButton) { // Kiểm tra nếu nút tồn tại
        addToCartButton.addEventListener("click", () => {
            showCustomAlert(`✅ Đã thêm "${name}" vào giỏ hàng!`);
        });
    } else {
        console.error("❌ Lỗi: Không tìm thấy nút 'Thêm vào giỏ hàng'!");
    }
    
    }

    // Hàm xử lý giỏ hàng
    function addToCart(productName, productPrice) {
        let cart = getCookie("cart") || [];
        const itemIndex = cart.findIndex(item => item.name === productName);

        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        saveCartToCookie(cart);
        updateCartCount();
    }

    function saveCartToCookie(cart) {
        setCookie("cart", cart, 7);
    }

    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        let totalQuantity = getCookie("cart").reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalQuantity;
        cartCount.style.display = totalQuantity > 0 ? "inline-block" : "none"; 
    }

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

    // Kiểm tra giỏ hàng khi tải trang
    updateCartCount();
});




function showCustomAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");

    if (alertBox && alertMessage) {
        alertMessage.innerText = message;
        alertBox.classList.add("show");

        setTimeout(() => {
            alertBox.classList.remove("show");
        }, 3000); // Alert biến mất sau 3 giây
    } else {
        console.error("❌ Lỗi: Không tìm thấy phần tử thông báo!");
    }
}
