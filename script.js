const MAX_FILE_SIZE = 500000;

function previewInput(src) {
    const fileInput = document.getElementById('file');
    fileInput.style.display = 'none';

    const uploadIcon = document.getElementById('upload-icon');
    uploadIcon.src = src;
    uploadIcon.style.width = '3rem';
    uploadIcon.style.height = '3rem';
    uploadIcon.style.borderRadius = '0.5rem';
    const uploadButton = document.getElementById('upload-button');
    uploadButton.style.padding = '0';
    const underIcon = document.getElementById('under-icon');
    underIcon.innerHTML = '';

    const changeInputButton = document.createElement('button');
    changeInputButton.classList.add('change-input-button');
    changeInputButton.innerHTML = 'Alterar';
    changeInputButton.addEventListener('click', () => {
        document.getElementById('file').click();
    });
    underIcon.appendChild(changeInputButton);

    const removeInputButton = document.createElement('button');
    removeInputButton.classList.add('change-input-button');
    removeInputButton.innerHTML = 'Remover';
    removeInputButton.addEventListener('click', () => {
        uploadIcon.src = './assets/images/icon-upload.svg';
        uploadButton.style.padding = '0.3rem';
        underIcon.innerHTML = 'Clique ou arraste para enviar';
        uploadIcon.style.width = '1.5rem';
        uploadIcon.style.height = '1.5rem';
        document.getElementById('file').value = '';
        fileInput.style.display = 'block';
        underIcon.removeChild(changeInputButton);
        underIcon.removeChild(removeInputButton);
    });
    underIcon.appendChild(removeInputButton);
}

function isFileValid() {
    const fileInput = document.getElementById('file');
    const fileName = fileInput.value;
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const fileSize = fileInput.files[0].size;
    
    if (!allowedExtensions.includes(fileExtension)) {
        alert('Por favor, envie uma imagem no formato JPG, JPEG ou PNG.');
        fileInput.value = '';
    } else if (fileSize > MAX_FILE_SIZE) {
        alert('Por favor, envie uma imagem com tamanho menor ou igual a 500KB.');
        fileInput.value = '';
    } else {
        let reader = new FileReader();

        reader.onload = () => {
            previewInput(reader.result)
            
        }

        reader.readAsDataURL(fileInput.files[0]);
        
    }
}

function storeData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const github = document.getElementById('github').value;
    const file = document.getElementById('file').files[0];
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('github', github);

    let reader = new FileReader();

    reader.onload = () => {
        localStorage.setItem('file', reader.result);
    }

    reader.readAsDataURL(fileInput.files[0]);
}

document.getElementById('file').addEventListener('change', function(event) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function(e) {
        document.getElementById('upload-icon').src = e.target.result;
        localStorage.setItem('file', reader.result);
      }
  
      reader.readAsDataURL(file);
    }
  });