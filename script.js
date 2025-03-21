const MAX_FILE_SIZE = 500000;

function isFileValid() {
    const fileInput = document.getElementById('file');
    const fileName = fileInput.value;
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const fileSize = fileInput.files[0].size;
    !allowedExtensions.includes(fileExtension) ? () => {alert('Formato inválido!'), fileInput.value = ''} : fileSize > MAX_FILE_SIZE ? () => {alert('Tamanho do arquivo inválido!'), fileInput.value = ''} : null
}

function storeData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const github = document.getElementById('github').value;
    const file = document.getElementById('file').files[0];
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('github', github);
    localStorage.setItem('file', file);
}