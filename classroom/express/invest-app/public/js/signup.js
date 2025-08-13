const form = document.querySelector('form');

window.handleSubmit = handleSubmit;

async function handleSubmit(event) {
  event.preventDefault();

  const user = Object.fromEntries(new FormData(form));

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const { email } = await response.json();

  if (email) {
    location.href = '/signin.html';
  } else {
    console.log('Error no cadastro');
  }
}
