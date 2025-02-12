const form = document.getElementById('form');
const cpf = document.getElementById('cpf');
const senha = document.getElementById('senha');

form.addEventListener('submit', e => {	
    e.preventDefault();
    validateInputs();
    if (isFormValid()) {
        window.location.replace("/src/pages/indexAdmin.html");
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const cpfValido = cpf => {
    const re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    console.log(re.match(cpf));
    return re.match(cpf);
}

const validateInputs = () => {
    const cpfValor = cpf.value.trim();
    const senhaValor = senha.value.trim();

    if(cpfValor === '') {
        setError(cpf, 'CPF é obrigatório');
    } else {
        setSuccess(cpf);
    }

    if(senhaValor === '') {
        setError(senha, 'Senha é obrigatória');
    } else if (senhaValor.length < 8 ) {
        setError(senha, 'Senhas precisam ter mais de 8 caracteres.')
    } else {
        setSuccess(senha);
    }
};

function isFormValid(){
    const inputControl = form.querySelectorAll('.input-control');
    let result = true;
    inputControl.forEach((container)=>{
        if(container.classList.contains('error')){
            result = false;
        }
    });
    return result;
}

