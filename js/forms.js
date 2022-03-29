const form = document.getElementById('form');
const input = document.querySelectorAll('#form input');

const expresions = {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	number: /^\d{7,14}$/ // 7 a 14 numeros.
}

const camps = {
    user: false,
    name: false,
    password: false,
    email: false,
    number: false
}


const formValidation = (event) => {
    switch (event.target.name) {
        case "user":
            validationCamp(expresions.user,event.target,'user');
        break;
        case "name":
            validationCamp(expresions.name,event.target,'name');
        break;
        case "password":
            validationCamp(expresions.password,event.target,'password');
            validationPassword();
        break;
        case "password2":
            validationPassword();
        break;
        case "email":
            validationCamp(expresions.email,event.target,'email');
        break;
        case "number":
            validationCamp(expresions.number,event.target,'number');
        break;
    }
}

const validationCamp = (expresion,input,camp) => {
    if(expresion.test(input.value)) {
        document.getElementById(`group--${camp}`).classList.remove('form--group-incorrect');
        document.getElementById(`group--${camp}`).classList.add('form--group-correct');
        document.querySelector(`#group--${camp} i`).classList.add('fa-check-circle');
        document.querySelector(`#group--${camp} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group--${camp} .form--input-error`).classList.remove('form--input-error-active');
        camps[camp] = true;
    } else {
        document.getElementById(`group--${camp}`).classList.add('form--group-incorrect');
        document.getElementById(`group--${camp}`).classList.remove('form--group-correct');
        document.querySelector(`#group--${camp} i`).classList.add('fa-times-circle');
        document.querySelector(`#group--${camp} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group--${camp} .form--input-error`).classList.add('form--input-error-active');
        camps[camp] = false;
    }
}

const validationPassword = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`group--password2`).classList.add('form--group-incorrect');
        document.getElementById(`group--password2`).classList.remove('form--group-correct');
        document.querySelector(`#group--password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#group--password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#group--password2 .form--input-error`).classList.add('form--input-error-active');
        camps['password'] = false;
    } else {
        document.getElementById(`group--password2`).classList.remove('form--group-incorrect');
        document.getElementById(`group--password2`).classList.add('form--group-correct');
        document.querySelector(`#group--password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#group--password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#group--password2 .form--input-error`).classList.remove('form--input-error-active');
        camps['password'] = true;
    }
}

input.forEach((input) => {
    input.addEventListener('keyup', formValidation)
    input.addEventListener('blur', formValidation)

});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const terms = document.getElementById('terms');
    if(camps.user && camps.name && camps.password && camps.email && camps.number && terms.checked) {
        form.reset();

        document.getElementById('form--msg-exito').classList.add('form--msg-exito-active');
        setTimeout(() => {
            document.getElementById('form--msg-exito').classList.remove('form--msg-exito-active');
        }, 5000);

        document.querySelectorAll('.form--group-correct').forEach((icon) => {
            icon.classList.remove('form--group-correct')
        });
    } else {
        document.getElementById('form--msg').classList.add('form--msg-active')
    }
});