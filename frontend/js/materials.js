document.addEventListener('DOMContentLoaded', function() {
    fetchMaterials();

    document.getElementById('addMaterialForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const material = {
            Name: document.getElementById('name').value,
            Description: document.getElementById('description').value,
            CategoryID: document.getElementById('categoryID').value,
            UnitOfMeasure: document.getElementById('unitOfMeasure').value,
            Price: document.getElementById('price').value
        };

        fetch('/api/materials.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('user')
            },
            body: JSON.stringify(material)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchMaterials();
        })
        .catch(error => console.error('Ошибка:', error));
    });
});

function fetchMaterials() {
    fetch('/api/materials.php', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('user')
        }
    })
    .then(response => response.json())
    .then(data => {
        const materialsList = document.getElementById('materialsList');
        materialsList.innerHTML = '';
        data.forEach(material => {
            const materialDiv = document.createElement('div');
            materialDiv.textContent = `Название: ${material.Name}, Описание: ${material.Description}, Цена: ${material.Price}`;
            materialsList.appendChild(materialDiv);
        });
    })
    .catch(error => console.error('Ошибка:', error));
}