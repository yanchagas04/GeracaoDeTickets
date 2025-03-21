const MAX_FILE_SIZE = 500000;

function isFileValid() {
    const fileInput = document.getElementById('file');
    const fileName = fileInput.value;
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const fileSize = fileInput.files[0].size;
    !allowedExtensions.includes(fileExtension) ? alert('Formato inválido!') : fileSize > MAX_FILE_SIZE ? alert('Tamanho do arquivo inválido!') : null
    fileInput.value = '';
}