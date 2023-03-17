document.getElementById('signup-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  // Ajout manuel du champ CSRF
  const csrfToken = document.querySelector('input[name="registration_form[_token]"]').value;
  formData.append('registration_form[_token]', csrfToken);

  try {
    const response = await fetch('/register', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      // Inscription réussie, rediriger l'utilisateur vers la page timeline
      if (jsonResponse.success) {
        // Inscription réussie, rediriger l'utilisateur vers la page timeline
        window.location.href = '/timeline';

    } else {
      // Afficher une erreur en utilisant jsonResponse.message et/ou jsonResponse.errors
    }
  } catch (error) {
    // Gérer l'erreur réseau
  }
});

document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          // Gérer le cas où il n'y a pas de champ "redirect" dans la réponse
        }
      } else {
        // Afficher une erreur
      }
    } else {
      // Afficher une erreur
    }
  } catch (error) {
    // Gérer l'erreur réseau
  }
});