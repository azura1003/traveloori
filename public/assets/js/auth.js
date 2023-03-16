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
      // Inscription réussie, vous pouvez fermer la popup ou rediriger l'utilisateur
    } else {
      // Afficher une erreur
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
              'X-Requested-With': 'XMLHttpRequest', // Ajoutez cet en-tête
          },
          body: formData
      });

      if (response.ok) {
          // Connexion réussie, vous pouvez fermer la popup ou rediriger l'utilisateur
      } else {
          // Afficher une erreur
      }
  } catch (error) {
      // Gérer l'erreur réseau
  }
});