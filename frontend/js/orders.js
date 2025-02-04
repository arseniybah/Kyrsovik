document.addEventListener('DOMContentLoaded', function() {
    fetchOrders();

    document.getElementById('addOrderForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const order = {
            SupplierID: document.getElementById('supplierID').value,
            OrderDate: document.getElementById('orderDate').value,
            Status: document.getElementById('status').value
        };

        fetch('/api/orders.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('user')
            },
            body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchOrders();
        })
        .catch(error => console.error('Ошибка:', error));
    });
});

function fetchOrders() {
    fetch('/api/orders.php', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('user')
        }
    })
    .then(response => response.json())
    .then(data => {
        const ordersList = document.getElementById('ordersList');
        ordersList.innerHTML = '';
        data.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.textContent = `ID заказа: ${order.OrderID}, Поставщик ID: ${order.SupplierID}, Дата: ${order.OrderDate}, Статус: ${order.Status}`;
            ordersList.appendChild(orderDiv);
        });
    })
    .catch(error => console.error('Ошибка:', error));
}