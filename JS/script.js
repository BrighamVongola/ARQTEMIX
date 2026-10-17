document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarrusel = document.getElementById("carrusel");

    // Lista de tus imágenes dentro de la carpeta "imagenes/"
    const imagenes = [
        "3.jpg.jpeg",
        "4.jpg.jpeg",
        "5.jpg.jpeg",
        "6.jpg.jpeg",
        "7.jpg.jpeg",
        "8.jpg.jpeg",
        "9.jpg.jpeg"
    ];

    function inicializarCarrusel() {
        contenedorCarrusel.innerHTML = "";

        // 1. Crear el bloque principal de elementos
        const trackPrincipal = document.createElement("div");
        trackPrincipal.style.display = "flex";
        trackPrincipal.style.gap = "25px";
        trackPrincipal.className = "carrusel-track";

        imagenes.forEach((nombreArchivo, index) => {
            const item = document.createElement("div");
            item.className = "carrusel-item";
            
            const img = document.createElement("img");
            img.src = `images/Personales/${nombreArchivo}`;
            img.alt = `Imagen ${index + 1}`;

            // --- AGREGA ESTAS LÍNEAS AQUÍ ---
            img.style.width = "320px";      // Ajusta el ancho deseado
            img.style.height = "200px";     // Ajusta el alto (hazlo más pequeño para que sea rectangular)
            img.style.objectFit = "contain"; // "contain" evita que se recorten (muestra la imagen completa)
            // ---------------------------------
            
            img.onerror = () => {
                img.src = `https://via.placeholder.com/320x200?text=Foto+${index + 1}`;
            };

            item.appendChild(img);
            trackPrincipal.appendChild(item);
        });

        // 2. Agregar el bloque original al carrusel
        contenedorCarrusel.appendChild(trackPrincipal);

        // 3. Forzar un reflow para medir el ancho real del bloque de imágenes con su gap
        const anchoBloque = trackPrincipal.offsetWidth + 35; // Ancho + el gap final

        // 4. Duplicar el bloque las veces necesarias para cubrir la animación de manera infinita
        // Creamos 2 copias adicionales para asegurar que nunca se quede sin elementos al desplazarse
        contenedorCarrusel.appendChild(trackPrincipal.cloneNode(true));
        contenedorCarrusel.appendChild(trackPrincipal.cloneNode(true));

        // 5. Asignar la variable CSS con el ancho exacto del bloque original en negativo
        // Esto hace que al llegar exactamente al final del primer bloque, reinicie la posición de forma invisible.
        contenedorCarrusel.style.setProperty('--scroll-width', `-${anchoBloque}px`);
    }

    inicializarCarrusel();
});