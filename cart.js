document.addEventListener("DOMContentLoaded", () => {
    function getCookie(name) {
        let cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            let [key, value] = cookie.split("=");
            if (key === name) return JSON.parse(value);
        }
        return [];
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

    let cart = getCookie("cart") || []; 

    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotalPrice = document.getElementById("cart-total-price");

        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <p>${item.name} - ${item.price.toLocaleString()}₫</p>
                <div class="quantity-controls">
                    <button class="decrease-qty" data-index="${index}">➖</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-qty" data-index="${index}">➕</button>
                </div>
                <button class="remove-item" data-index="${index}">❌ Xóa</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.quantity * item.price;
        });

        cartTotalPrice.innerText = `${totalPrice.toLocaleString()}₫`;

        setCookie("cart", cart, 7);

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                removeItem(parseInt(button.dataset.index));
            });
        });

        document.querySelectorAll(".increase-qty").forEach(button => {
            button.addEventListener("click", () => {
                changeQuantity(parseInt(button.dataset.index), 1);
            });
        });

        document.querySelectorAll(".decrease-qty").forEach(button => {
            button.addEventListener("click", () => {
                changeQuantity(parseInt(button.dataset.index), -1);
            });
        });
    }

    function removeItem(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    }

    function changeQuantity(index, amount) {
        if (cart[index]) {
            cart[index].quantity += amount;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            updateCartDisplay();
        }
    }

    // 💳 Sự kiện "Thanh toán"
    const checkoutBtn = document.getElementById("checkout");
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("🔔 Giỏ hàng của bạn đang trống!");
        } else {
            alert("💳 Bạn đang tiến hành thanh toán!");
        }
    });

    updateCartDisplay();
});
