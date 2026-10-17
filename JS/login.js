let modoActual = 'login'; // 'login' o 'register'

// Alternar entre pestaña de Iniciar Sesión y Registrarse
function mostrarModo(modo) {
    modoActual = modo;
    const title = document.getElementById('form-title');
    const submitBtn = document.getElementById('btn-submit');
    const emailGroup = document.getElementById('group-email');
    const emailInput = document.getElementById('email');
    const form = document.getElementById('auth-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');

    if (modo === 'register') {
        title.innerText = 'Crear Cuenta';
        submitBtn.innerText = 'Registrarse';
        form.action = 'register.php'; // Cambia el destino en backend
        emailGroup.classList.remove('hidden');
        emailInput.setAttribute('required', 'true');

        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
    } else {
        title.innerText = 'Iniciar Sesión';
        submitBtn.innerText = 'Ingresar';
        form.action = 'login.php';
        emailGroup.classList.add('hidden');
        emailInput.removeAttribute('required');

        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    }
}

// Manejador del envío del formulario
function manejarAutenticacion(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (modoActual === 'register') {
        const email = document.getElementById('email').value;
        console.log("Registrando usuario:", { username, email, password });
        // Si no usas PHP inmediatamente, puedes hacer validaciones JS o AJAX aquí.
    } else {
        console.log("Iniciando sesión con:", { username, password });
    }
}

// Callback cuando el usuario se autentica exitosamente con Google
function handleCredentialResponse(response) {
    // La respuesta contiene el token JWT generado por Google
    const jwtToken = response.credential;
    console.log("Token JWT de Google obtenido:", jwtToken);

    // Decodificar payload para obtener datos básicos del usuario
    const payload = parseJwt(jwtToken);
    console.log("Usuario de Google:", payload.name, payload.email);

    alert(`¡Bienvenido/a, ${payload.name}! Logueado mediante Google (${payload.email})`);

    // Aquí puedes enviar el jwtToken a tu servidor PHP mediante fetch/AJAX:
    /*
    fetch('google-auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: jwtToken })
    })
    .then(res => res.json())
    .then(data => { window.location.href = 'dashboard.php'; });
    */
}

// Función auxiliar para decodificar el token de Google
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}