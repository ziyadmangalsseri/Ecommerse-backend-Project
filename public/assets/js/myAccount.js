document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    const links = document.querySelectorAll('#sidebar ul li a[data-toggle="content-section"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all sections
            sections.forEach(section => section.classList.remove('active'));
            links.forEach(link => link.parentElement.classList.remove('active'));

            // Add active class to clicked link and corresponding section
            const target = document.querySelector(this.getAttribute('href'));
            target.classList.add('active');
            this.parentElement.classList.add('active');
        });
    });

    // Load some dummy data for orders
    const orderList = document.getElementById('order-list');
    const orders = [
        { id: 'ORD001', date: '2023-09-10', total: '$100', status: 'Shipped' },
        { id: 'ORD002', date: '2023-09-15', total: '$150', status: 'Delivered' },
        { id: 'ORD003', date: '2023-09-20', total: '$200', status: 'Pending' },
    ];

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.total}</td>
            <td>${order.status}</td>
            <td><button class="btn-primary">View</button></td>
        `;
        orderList.appendChild(row);
    });
});
