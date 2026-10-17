// Inicializar mapa en Managua
const map = L.map('map').setView([12.1212, -86.1750], 14);

// Capa de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Estilo del marcador/señalización en el mapa con la paleta de colores del proyecto
const customIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="
        background-color: #0284c7; 
        border: 3px solid #0f172a; 
        width: 22px; 
        height: 22px; 
        border-radius: 50%; 
        box-shadow: 0 0 8px rgba(2, 132, 199, 0.6);
        cursor: pointer;">
    </div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
});

const markerBounds = [];

function cargarDetalleReservorio(reservorio) {
    const imageContainer = document.getElementById('image-container');
    const infoContainer = document.getElementById('info-container');

    if (imageContainer) {
        imageContainer.innerHTML = `
            <img src="${reservorio.imagen}" alt="${reservorio.nombre}" class="detalle-img">
            <h3>${reservorio.nombre}</h3>
        `;
    }

    if (infoContainer) {
        infoContainer.innerHTML = `
            <h3>${reservorio.nombre}</h3>
            <p><strong>Descripción:</strong> ${reservorio.descripcion}</p>
            <p style="margin-top: 0.5rem;"><strong>Latitud:</strong> ${reservorio.lat}</p>
            <p><strong>Longitud:</strong> ${reservorio.lng}</p>
        `;
    }
}

// Cargar reservorios.json dinámicamente
async function cargarDatosJSON() {
    let response;
    try {
        response = await fetch('reservorios.json');
        if (!response.ok) throw new Error();
    } catch (e) {
        response = await fetch('../data/reservorios.json');
    }

    const data = await response.json();

    data.forEach((reservorio, index) => {
        const latLng = [reservorio.lat, reservorio.lng];
        markerBounds.push(latLng);

        // Crear el marcador (señalización) en el mapa
        const marker = L.marker(latLng, { icon: customIcon }).addTo(map);

        marker.bindPopup(`<b>${reservorio.nombre}</b><br>Haz clic para ver más información.`);

        marker.on('click', () => {
            cargarDetalleReservorio(reservorio);
        });

        if (index === 0) {
            cargarDetalleReservorio(reservorio);
        }
    });

    if (markerBounds.length > 0) {
        map.fitBounds(markerBounds, { padding: [50, 50] });
    }
}

cargarDatosJSON().catch(error => {
    console.error('No se pudo cargar el archivo reservorios.json:', error);
});


// ==========================================
// FUNCIÓN DE LOGOUT (CERRAR SESIÓN) AL FINAL
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const btnLogout = document.getElementById("btn-logout");

    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            // Opcional: Limpiar credenciales o datos almacenados en sesion
            sessionStorage.clear();
            localStorage.removeItem("userSession");

            // Redirigir al inicio de sesión (login.html)
            window.location.href = "login.html";
        });
    }
});