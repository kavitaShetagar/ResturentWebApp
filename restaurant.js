let userType;
let menu = [
    { id: 1, name: "Pizza", cuisine: "Italian", price: 12 },
    { id: 2, name: "Pasta", cuisine: "Italian", price: 10 },
    { id: 3, name: "Tacos", cuisine: "Mexican", price: 8 },
    { id: 4, name: "Curry", cuisine: "Indian", price: 15 },
];

let order = []; // Store all orders

function showLogin(type) {
    userType = type;
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("menu-section").classList.add("hidden");
    document.getElementById("order-section").classList.add("hidden");
    document.getElementById("feedback-section").classList.add("hidden");
}

function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if ((userType === 'owner' && username === 'owner' && password === 'owner') ||
        (userType === 'customer' && username)) {
        alert(`${userType} logged in`);
        showMenu();
    } else {
        alert("Invalid login");
    }
}

function showMenu() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("menu-section").classList.remove("hidden");
    displayMenu(menu);
}

function displayMenu(menuItems) {
    const menuContainer = document.getElementById("menu-items");
    menuContainer.innerHTML = '';
    menuItems.forEach(item => {
        menuContainer.innerHTML += `
            <div class="menu-item">
                <span>${item.name} - $${item.price}</span>
                <button onclick="addToOrder(${item.id})">Add to Order</button>
            </div>
        `;
    });
}

function addToOrder(id) {
    const item = menu.find(i => i.id === id);
    const orderItem = order.find(i => i.id === id);

    if (orderItem) {
        orderItem.quantity += 1;
    } else {
        order.push({ ...item, quantity: 1 });
    }

    alert(`${item.name} added to your order.`);
    showOrder();
}

function showOrder() {
    const orderContainer = document.getElementById("order-list");
    orderContainer.innerHTML = '';
    let totalPrice = 0;

    order.forEach(item => {
        totalPrice += item.price * item.quantity;
        orderContainer.innerHTML += `
            <div class="order-item">
                <span>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });

    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    document.getElementById("menu-section").classList.add("hidden");
    document.getElementById("order-section").classList.remove("hidden");
}

function generateBill() {
    if (order.length === 0) {
        alert("No items in order.");
        return;
    }

    let bill = "Your Bill:\n";
    let total = 0;

    order.forEach(item => {
        bill += `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        total += item.price * item.quantity;
    });

    bill += `\nTotal: $${total.toFixed(2)}`;
    alert(bill);

    order = []; // Clear order after billing
    showFeedback();
}

function showFeedback() {
    document.getElementById("order-section").classList.add("hidden");
    document.getElementById("feedback-section").classList.remove("hidden");
}

function submitFeedback() {
    const feedback = document.getElementById("feedback-text").value;
    alert("Thank you for your feedback: " + feedback);
    showMenu();
}
