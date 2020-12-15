const a_auth = document.querySelector('.a_auth');
a_auth.addEventListener('submit', a_auth_onsubmit);

async function a_auth_onsubmit(e) {
  e.preventDefault();

  let a_auth_data = new FormData(this);

  fetch('public/src/auth.php', {
    method: 'POST',
    body: a_auth_data,
  })
    .then((res) => res.text())
    .then((msg) => {
      console.log('.then ~ msg', msg);
    });
}
