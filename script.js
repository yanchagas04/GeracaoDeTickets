let name_error;
let email_error;
let github_error;
const MAX_FILE_SIZE = 500000;

// Limpa os dados assim que carregar/voltar a página
window.addEventListener('pageshow', function(event) {
    localStorage.clear();
    name_error = false;
    email_error = false;    
    github_error = false;
    document.getElementById('file').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('github').value = '';
});

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
    let file_hint = document.getElementById('file-hint');


    if (!allowedExtensions.includes(fileExtension)) {
        file_hint.style.color = 'red';
        file_hint.innerHTML = '<img src="./assets/images/icon-info-red.svg" alt="">Formato de arquivo inválido. Por favor, envie uma imagem no formato JPG, JPEG ou PNG.';
        fileInput.value = '';
    } else if (fileSize > MAX_FILE_SIZE) {
        file_hint.style.color = 'red';
        file_hint.innerHTML = '<img src="./assets/images/icon-info-red.svg" alt="">Arquivo muito grande. Por favor, envie uma imagem com tamanho menor que 500KB.';
        fileInput.value = '';
    } else {
        file_hint.style.color = 'hsl(252, 6%, 83%)';
        file_hint.innerHTML = '<img src="./assets/images/icon-info.svg" alt="">Envie sua foto (JPG, PNG, max: 500KB).';
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
    const fileInput = document.getElementById('file');
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

  function submit() {

    let error = false;
    error = verifyFile(error);

    error = verifyName(error);

    error = verifyEmail(error);
    
    error = verifyGithub(error);
    
    if (!error) {
        storeData();
        window.location.href = './ticket/index.html';
    }
  }

function verifyGithub(error) {
    if (document.getElementById('github').value === '' && github_error === false) {
        const githubHint = document.createElement('span');
        githubHint.classList.add('error');
        githubHint.style.color = 'red';
        githubHint.classList.add('file-hint');
        githubHint.innerHTML = '<img src="./assets/images/icon-info-red.svg" alt="">Por favor, insira seu usuário GitHub.';
        document.getElementById('github-container').appendChild(githubHint);
        github_error = true;
        error = true;
    } else if (!document.getElementById('github').value.startsWith('@') && github_error === false) {
        const githubHint = document.createElement('span');
        githubHint.classList.add('error');
        githubHint.style.color = 'red';
        githubHint.classList.add('file-hint');
        githubHint.innerHTML = '<img src="./assets/images/icon-info-red.svg" alt="">Por favor, insira um usuário válido.';
        document.getElementById('github-container').appendChild(githubHint);
        github_error = true;
        error = true;
    } else if (document.getElementById('github').value.startsWith('@') && document.getElementById('github').value !== '' && github_error === true) {
        document.getElementById('github-container').removeChild(document.getElementById('github-container').lastChild);
        github_error = false;
        error = false;
    }
    return error;
}

function verifyEmail(error) {
    if (document.getElementById('email').value === '' && email_error === false) {
        const emailHint = document.createElement('span');
        emailHint.classList.add('error');
        emailHint.style.color = 'red';
        emailHint.classList.add('file-hint');
        emailHint.innerHTML = '<img src="./assets/images/icon-info-red.svg" alt="">Por favor, insira seu email.';
        document.getElementById('email-container').appendChild(emailHint);
        email_error = true;
        error = true;
    } else if (!document.getElementById('email').value.includes('@') && !document.getElementById('email').value.includes('.') && document.getElementById('email').lastChild.classList.contains('error') === false) {
        const emailHint = document.createElement('span');
        emailHint.classList.add('error');
        emailHint.style.color = 'red';
        emailHint.classList.add('file-hint');
        emailHint.innerHTML = '<img src="./assets/images/icon-info-red.svg" alt="">Por favor, insira um email válido.';
        document.getElementById('email-container').appendChild(emailHint);
        email_error = true;
        error = true;
    } else if (document.getElementById('email').value !== '' && email_error === true) {
        document.getElementById('email-container').removeChild(document.getElementById('email-container').lastChild);
        email_error = false;
        error = false;
    }
    return error;
}

function verifyName(error) {
    if (document.getElementById('name').value === '' && name_error === false) {
        const nameHint = document.createElement('span');
        nameHint.classList.add('error');
        nameHint.style.color = 'red';
        nameHint.classList.add('file-hint');
        nameHint.innerHTML = '<img src="./assets/images/icon-info-red.svg" alt="">Por favor, insira seu nome completo.';
        document.getElementById('name-container').appendChild(nameHint);
        name_error = true;
        error = true;
    } else if (document.getElementById('name').value !== '' && name_error === true) {
        document.getElementById('name-container').removeChild(document.getElementById('name-container').lastChild);
        name_error = false;
        error = false;
    }
    return error;
}

function verifyFile(error) {
    if (document.getElementById('file').files.length === 0) {
        let file_hint = document.getElementById('file-hint');
        file_hint.style.color = 'red';
        file_hint.innerHTML = '<img src="./assets/images/icon-info-red.svg" alt="">Por favor, envie uma imagem.';
        error = true;
    } else {
        let file_hint = document.getElementById('file-hint');
        file_hint.style.color = 'hsl(252, 6%, 83%)';
        file_hint.innerHTML = '<img src="./assets/images/icon-info.svg" alt="">Envie sua foto (JPG, PNG, max: 500KB).';
    }
    return error;
}
