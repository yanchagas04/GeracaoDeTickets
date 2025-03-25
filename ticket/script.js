//Impede de voltar ao formulário e retornar ao ticket novamente
window.addEventListener('pageshow', function(event) {
    if (!localStorage.getItem('name')) {
        window.location.href = '../index.html';
    }
})

//Preenche o ticket
let name = localStorage.getItem('name');
const nome = document.getElementById('nome-titulo').textContent = name;
const email = document.getElementById('email-titulo').textContent = localStorage.getItem('email');
const github = document.getElementById('github-ticket');
const icon = document.createElement('img');
icon.src = '../assets/images/icon-github.svg';
icon.width = '20';
icon.height = '20';
github.innerHTML = localStorage.getItem('github');
github.appendChild(icon);
const avatar = document.getElementById('avatar-ticket').src = localStorage.getItem('file');
const nome_ticket = document.getElementById('name-ticket').innerHTML = name;
if (localStorage.getItem('ticket') == null || localStorage.getItem('ticket') == undefined) {
    const random_ticket_number = Math.floor(Math.random() * 1000000);
    localStorage.setItem('ticket', random_ticket_number);
}
let ticket_number = document.getElementById('ticket-number').innerHTML = "#" + localStorage.getItem('ticket');