
const valid_class = "valid"
const invalid_class = "invalid"
const form = document.getElementById("register-form")

const firstname = document.getElementById("firstname")
const firstname_class = firstname.className
const firstname_err = document.getElementById("firstname_err")
let firstname_messages = []

const lastname = document.getElementById("lastname")
const lastname_class = lastname.className
const lastname_err = document.getElementById("lastname_err")
let lastname_messages = []

const password = document.getElementById("password")
const password_class = password.className
const password_err = document.getElementById("password_err")
let password_messages = []

const password2 = document.getElementById("password2")
const password2_class = password2.className
const password2_err = document.getElementById("password2_err")
let password2_messages = []

const login = document.getElementById("login")
const login_class = login.className
const login_err = document.getElementById("login_err")
let login_messages = []

const login_availability_err = document.getElementById("login_availability_err")
let login_availability_messages = []


const PL = 'ĄĆĘŁŃÓŚŹŻ'
const pl = 'ąćęłńóśźż'
const re = new RegExp('^[A-Z{'+PL+'}][a-z{'+pl+'}]+.+$');

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    var DONE = 4;
    var OK = 200;
    if(xhr.readyState == DONE){
        if(xhr.status == OK){
            var jsonValue = JSON.parse(xhr.responseText)
            var availability = jsonValue[login.value]
            console.log(availability)
            login_availability_messages = []
            if (availability == 'taken'){
                login_availability_messages.push('Ta nazwa użytkownika jest już zajęta!')
            }

            login_availability_err.innerText = login_availability_messages.join('\n')
            applyVisualChanges(login, login_availability_messages, login_class)
        } else {
            console.log('Error: ' + xhr.status)
        }
    }
}



firstname.addEventListener("input", validateFirstname)
lastname.addEventListener("input", validateLastname)
login.addEventListener("input", validateLogin) ; login.addEventListener("input", checkUsernameAvailability)
password.addEventListener("input", validatePassword) ; password.addEventListener("input", validatePassword2)
password2.addEventListener("input", validatePassword2) ; password2.addEventListener("click", validatePassword2)




form.addEventListener('submit', (e) => {
    if (firstname_messages.length > 0 | lastname_messages.length > 0
         | password_messages.length > 0 | login_messages.length > 0 
         | password2_messages.length > 0 | login_availability_messages.length > 0){
        e.preventDefault()
    }
})

function checkUsernameAvailability(){
    var url = 'https://infinite-hamlet-29399.herokuapp.com/check/' + login.value
    xhr.open('GET', url);
    xhr.send(null)
}

function validateFirstname(){
    firstname_messages = []

    if(!(/^[a-ż ,.'-]{0,}$/i.test(firstname.value))){
        firstname_messages.push('Imię nie może skłądać się z cyfr ani znaków specjalnych.')
    }
    if(!(/^.{3,20}$/i.test(firstname.value))){
        firstname_messages.push('Imię musi składać się z 3-20 znaków.')
    }
    if(!(re.test(firstname.value))){
        firstname_messages.push('Imię musi zaczynać się z wielkiej litery. Pozostałe litery muszą być małe.')
    }

    firstname_err.innerText = firstname_messages.join('\n')
    applyVisualChanges(firstname, firstname_messages, firstname_class) 
}

function validateLastname(){
    lastname_messages = []
    
    if(!(/^[a-ż ,.'-]{0,}$/i.test(lastname.value))){
        lastname_messages.push('Imię nie może skłądać się z cyfr ani znaków specjalnych.')
    }
    if(!(/^.{3,20}$/i.test(lastname.value))){
        lastname_messages.push('Imię musi składać się z 3-20 znaków.')
    }
    if(!(re.test(lastname.value))){
        lastname_messages.push('Nazwisko powinno mieć tylko pierwszą literę wielką.')
    }

    lastname_err.innerText = lastname_messages.join('\n')
    applyVisualChanges(lastname, lastname_messages, lastname_class)
}

function validatePassword(){
    password_messages = []
    
    if(!(/^.{8,}$/.test(password.value))){
        password_messages.push('Hasło musi składać się z co najmniej 8 znaków.')
    }

    password_err.innerText = password_messages.join('\n')
    applyVisualChanges(password, password_messages, password_class)
}

function validatePassword2(){
    password2_messages = []
    
    if(password2.value != password.value){
        password2_messages.push('Hasła muszą być identyczne!')
    }

    password2_err.innerText = password2_messages.join('\n')
    applyVisualChanges(password2, password2_messages, password2_class)
}

function validateLogin(){
    login_messages = []
    
    if(!(/^[a-z]{3,12}$/.test(login.value))){
        login_messages.push('Nazwa użytkownika musi składać się z 3-12 małych liter alfabetu angielskiego.')
    }

    login_err.innerText = login_messages.join('\n')
    applyVisualChanges(login, login_messages, login_class)
}

function applyVisualChanges(id, id_messages, id_class){
    if (id_messages.length == 0){
        id.className = id_class + " " + valid_class
    }
    else {
        id.className = id_class + " " + invalid_class
    }
}