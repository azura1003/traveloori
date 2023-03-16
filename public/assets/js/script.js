document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const request = new XMLHttpRequest();

        request.open('POST', '/login');
        request.onload = function () {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                if (response.success) {
                    // Redirigez vers la page de test après la connexion réussie
                    window.location.href = '/test-page';
                } else {
                    // Gérez les erreurs de connexion ici, par exemple, affichez un message d'erreur
                    console.error('Erreur lors de la connexion:', response.message);
                }
            } else {
                // Gérez les erreurs de requête ici
                console.error('Erreur lors de la requête AJAX:', request.statusText);
            }
        };

        request.send(formData);
    });
});