const form = document.getElementById('form');
const cpf = document.getElementById('cpf');
const email = document.getElementById('email');
const celular = document.getElementById('celular');
const nomeCompleto = document.getElementById('nomeCompleto');
const especializacao = document.getElementById('especializacao');
const casa = document.getElementById('casa');

form.addEventListener('submit', async e => {	
    e.preventDefault();
    validateInputs();
    if (isFormValid()) {
        const isValid = await validateVoluntario(cpf.value, email.value, celular.value, nomeCompleto.value, especializacao.value, casa.value);
        if (isValid) {
            window.location.replace("/index.html");
        } else {
            setError(cpf, 'CPF, email ou celular inválidos');
            setError(email, 'CPF, email ou celular inválidos');
            setError(celular, 'CPF, email ou celular inválidos');
        }
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
    return re.test(cpf);
}

const validateInputs = () => {
    const cpfValor = cpf.value.trim();
    const emailValor = email.value.trim();
    const celularValor = celular.value.trim();

    if(cpfValor === '') {
        setError(cpf, 'CPF é obrigatório');
    } else if (!cpfValido(cpfValor)) {
        setError(cpf, 'CPF inválido');
    } else {
        setSuccess(cpf);
    }

    if(emailValor === '') {
        setError(email, 'Email é obrigatório');
    } else if (!isValidEmail(emailValor)) {
        setError(email, 'Email inválido');
    } else {
        setSuccess(email);
    }

    if(celularValor === '') {
        setError(celular, 'Celular é obrigatório');
    } else if (!isValidCelular(celularValor)) {
        setError(celular, 'Celular inválido');
    } else {
        setSuccess(celular);
    }
};

const isValidEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const isValidCelular = celular => {
    const re = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/;
    return re.test(celular);
}

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

async function validateVoluntario(cpf, email, celular, nomeCompleto, especializacao, casa) {
    try {
        const response = await fetch(`http://localhost:3001/validateVoluntario?cpf=${cpf}&email=${email}&celular=${celular}&nomeCompleto=${nomeCompleto}&especializacao=${especializacao}&casa=${casa}`);
        const data = await response.json();
        return data.valid;
    } catch (error) {
        console.error('Error validating voluntario:', error);
        return false;
    }
}



