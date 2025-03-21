const nome = document.getElementById('nome').textContent = localStorage.getItem('name');
const email = document.getElementById('email').textContent = localStorage.getItem('email');
const github = document.getElementById('github').textContent = localStorage.getItem('github');
const avatar = document.getElementById('avatar').src = localStorage.getItem('file');