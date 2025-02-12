const form = document.getElementById('form');
const cpf = document.getElementById('cpf');
const senha = document.getElementById('senha');

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
    const re = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;
    return re.test(cpf);
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

    if(senha.classList.contains('success') && cpf.classList.contains('success')) {
        window.location.replace("/src/pages/indexAdmin.html");
    }
};
