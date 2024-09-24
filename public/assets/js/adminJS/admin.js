
document.addEventListener("DOMContentLoaded", function () {
    // Sidebar navigation handling
    const sidebarLinks = document.querySelectorAll("#sidebar ul li a");
    const sections = document.querySelectorAll(".content-section");

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function () {
            // Remove active class from all links and sections
            sidebarLinks.forEach(link => link.parentNode.classList.remove("active"));
            sections.forEach(section => section.classList.remove("active"));

            // Add active class to clicked link and corresponding section
            this.parentNode.classList.add("active");
            const targetSection = document.querySelector(this.getAttribute("href"));
            targetSection.classList.add("active");
        });
    });

    // Dummy product list
    const productList = document.getElementById("product-list");
    const products = [
        { name: 'Product 1', price: '$100', stock: '25' },
        { name: 'Product 2', price: '$150', stock: '10' }
    ];

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td><button class="btn-primary">Edit</button></td>
        `;
        productList.appendChild(row);
    });

    // Dummy order list
    const orderList = document.getElementById("order-list");
    const orders = [
        { id: 'ORD001', customer: 'John Doe', total: '$200', status: 'Processing' },
        { id: 'ORD002', customer: 'Jane Smith', total: '$150', status: 'Shipped' }
    ];

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.total}</td>
            <td>${order.status}</td>
            <td><button class="btn-primary">View</button></td>
        `;
        orderList.appendChild(row);
    });

    // Dummy customer list
    const customerList = document.getElementById("customer-list");
    const customers = [
        { name: 'John Doe', email: 'john@example.com', orders: '5' },
        { name: 'Jane Smith', email: 'jane@example.com', orders: '3' }
    ];

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.orders}</td>
            <td><button class="btn-primary">View</button></td>
        `;
        customerList.appendChild(row);
    });
});


//CATEGORY

document.addEventListener("DOMContentLoaded",()=>{
    const form = document.querySelector("category-form")
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        fetch("/api/admin")
    })
})
    