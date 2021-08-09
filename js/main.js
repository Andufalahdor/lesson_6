let signup = document.forms.signup;
let signin = document.forms.signin

let nameRegExp = /^[A-Za-z]{1,20}$/;
let emailRegExp = /^[A-Za-z0-9.-]*@\w*[.]\w{2,}$/;
let passRegExp = /^[A-Za-z0-9!@#$%^&*]{8,15}$/;

let accounts = [];
let profile = {}

function validation() {
    let nameValidation = nameRegExp.test(signup.firstName.value);
    let lnameValidation = nameRegExp.test(signup.lastName.value);
    let emailValidation = emailRegExp.test(signup.email.value);
    let passValidation = passRegExp.test(signup.password.value);
    if (nameValidation && lnameValidation && emailValidation && passValidation) {
        return true;
    } else {
        return false;
    }
}

class Account {
    constructor(email, pass, fName, lName) {
        this.email = email;
        this.pass = pass;
        this.firstName = fName;
        this.lastName = lName;
    }
}

// Sign Up
document.forms.signup.signUp.addEventListener("click", (e) => {
    if (validation()) {
        e.preventDefault();
        if (localStorage.getItem('accounts')) {
            accounts = JSON.parse(localStorage.getItem('accounts'));
        }
        if (!accounts.some(acc => acc.email.toLowerCase() == signup.email.value.toLowerCase())) {
            let account = new Account(signup.email.value, signup.password.value, signup.firstName.value, signup.lastName.value);
            accounts.push(account);
            localStorage.setItem('accounts', JSON.stringify(accounts));
            document.querySelector('.error').innerText = `${signup.email.value} прошел регистрацию`;
        } else {
            document.querySelector('.error').innerText = `email ${signup.email.value} уже присутствует в массиве`;
        }
        signup.reset();
    }
})

// Sign In
document.forms.signin.signIn.addEventListener("click", (e) => {
    if (signin.email.validity.valid && signin.password.validity.valid) {
        e.preventDefault();
        if (localStorage.getItem('accounts')) {
            accounts = JSON.parse(localStorage.getItem('accounts'));
            let loginValidation = accounts.some((acc) => {
                if (acc.email.toLowerCase() == signin.email.value.toLowerCase()) {
                    if (acc.pass == signin.password.value) {
                        profile = acc;
                        document.querySelector('.error').innerText = ``;
                        return true;
                    } else {
                        document.querySelector('.error').innerText = `Неправильный пароль`;
                    }
                } else {
                    document.querySelector('.error').innerText = `Неправильный логин`;
                }
            })
            if (loginValidation) {
                document.querySelector('.signup').classList.add('hide');
                document.querySelector('.profile').classList.remove('hide');
                document.querySelector('.signin').classList.add('hide');
                document.querySelector('.profile-name').innerText = `${profile.firstName} ${profile.lastName}`;
                document.querySelector('.profile-email').innerText = `${profile.email}`;
            }
        } else {
            document.querySelector('.error').innerText = `localStorage not found`;
        }
        signin.reset();
    }
})

// Sing out
document.querySelector('.signout-btn').addEventListener("click", () => {
    document.querySelector('.signup').classList.add('hide');
    document.querySelector('.profile').classList.add('hide');
    document.querySelector('.signin').classList.remove('hide');
    profile = {};
    document.querySelector('.profile-name').innerText = ``;
    document.querySelector('.profile-email').innerText = ``;
})

// Sign in now
document.querySelector('.signin-btn').addEventListener("click", () => {
    document.querySelector('.signup').classList.add('hide');
    document.querySelector('.profile').classList.add('hide');
    document.querySelector('.signin').classList.remove('hide');
    document.querySelector('.error').innerText = ``;
})

// Sign up now
document.querySelector('.signup-btn').addEventListener("click", () => {
    document.querySelector('.signup').classList.remove('hide')
    document.querySelector('.profile').classList.add('hide')
    document.querySelector('.signin').classList.add('hide')
    document.querySelector('.error').innerText = ``;
})