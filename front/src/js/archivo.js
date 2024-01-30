
// Archivo.js
const map = L.map('map');
map.setView([4.533888, -75.681107], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

const parqueaderos = [
    {  parqueadero: 'Parqueadero 1', lat: 4.532047, lng: -75.681577, info: 'Información sobre Parqueadero 1' },
    { parqueadero: 'Parqueadero 2', lat: 4.530976, lng: -75.683888, info: 'Información sobre Parqueadero 2' },
]

for (const parqueadero of parqueaderos) {
    const marker = L.marker([parqueadero.lat, parqueadero.lng]).addTo(map);
    marker.bindPopup(parqueadero.parqueadero);

    marker.on('click', () => {
        openParqueaderoModal(parqueadero);
    });
}


function openParqueaderoModal(parqueadero) {
    const modalBody = document.getElementById('parqueaderoModalBody');
    modalBody.innerHTML = `
        <img src="${parqueadero.parqueadero}" alt="${parqueadero.name}" width="465px">
        <h3>${parqueadero.name}</h3>
        <p>${parqueadero.info}</p>
    `;

    const modal = new bootstrap.Modal(document.getElementById('parqueaderoModal'));
    modal.show();

    /*document.addEventListener('DOMContentLoaded', function() {
        let calendar2 = new Calendar('calendar2');
        calendar2.getElement().addEventListener('change', e => {
            console.log(calendar2.value().format('LLL'));
        });
    });*/

    document.addEventListener('DOMContentLoaded', function() {
        const botonRedirigir = document.getElementById('button');
        
        botonRedirigir.addEventListener('click', function() {
            window.location.href = '/infoParqueadero.tsx';
        });
    });
}                                                                  