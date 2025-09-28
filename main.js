'use strict';

let IsError=false;
let form=document.getElementById("form");
let codeform=document.getElementById("codeform");
let loginform=document.getElementById("loginform");
let Msg=document.getElementById("msg");
let email=/^[a-zA-Z0-9]+@gmail\.com$/;
let password=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

let URL='https://registerapi.runasp.net/api/Account/';


async function Submit() {
    // FormData and condition are not defined; remove or implement as needed
    let elements = new FormData(form);
    if (elements.get("username")===null|| elements.get("username")==='') {
        IsError=true;
        document.getElementById("Username").classList.add("is-invalid");
    }
    if (!email.test(elements.get("email"))) {
        IsError=true;
        document.getElementById("Email").classList.add("is-invalid");
    }
    if (!password.test(elements.get("password"))) {
        IsError=true;
        document.getElementById("Password").classList.add("is-invalid");
    }
    if (!password.test(elements.get("passwordConfirmed")) || !(elements.get("passwordConfirmed")===elements.get("password"))) {
        IsError=true;
        document.getElementById("PasswordConfirmed").classList.add("is-invalid");
    }
    if(IsError===false){
       subscribe();
    }

}
const subscribe=async () => {
         try {
             const formData = new FormData(form);

            const data = {
                userName: formData.get("username"),
                email: formData.get("email"),
                password: formData.get("password"),
                passwordConfirmed: formData.get("passwordConfirmed")
            };

            const response = await fetch(`${URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) // Or use JSON.stringify(...) if needed
            });
            if (response.ok) {
                const result = await response.text();
                showMessage(result, response.status == 200 ? 'success' : 'error');
                if(response.status==200)
                    localStorage.setItem("SignIn",true);
            }
        } catch (error) {
           showMessage(error.message, 'error');
        //    console.log(error);
            localStorage.setItem("SignIn",false);
           
        }
    }
const showMessage = (message, type = 'success') => {
    Msg.innerHTML = `
        <div class="alert alert-${type}">
        ${message}
        </div>
    `;
    if (type==='success') {
        setTimeout(()=>{
            window.location.href="./Code.html";
        },1000)
    }
};

async function CodeSend() {
    let elements = new FormData(codeform);
    
    if (elements.get("Code")===null|| elements.get("Code")===''|| elements.get("Code").length!==6) {
        document.getElementById("Code").classList.add("is-invalid");
    }
   else{
       codeSubscribe();
    }
    
}
const codeSubscribe=async () => {
    try {
             const formData = new FormData(codeform);

            const data = {
                email: localStorage.getItem("email"),
                code: formData.get("Code"),
            };

            const response = await fetch(`${URL}Verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) // Or use JSON.stringify(...) if needed
            });
            if (response.ok) {
                const result = await response.text();
                showMessage(result, response.status == 200 ? 'success' : 'error');
                window.location.href="./Login.html";
                if(response.status==200)
                    localStorage.setItem("Code",true);
            }
        } 
        catch (error) {
        //    showMessage(error.message, 'error');
           console.log(error);
            localStorage.setItem("Code",false);
        }
    }

async function Login() {
    IsError=false;
    let elements = new FormData(loginform);
    if (elements.get("username")===null|| elements.get("username")==='') {
        IsError=true;
        document.getElementById("Username").classList.add("is-invalid");
    }
    if (!password.test(elements.get("password"))) {
        IsError=true;
        document.getElementById("Password").classList.add("is-invalid");
    }
   if(IsError===false){
       loginSubscribe();
    }    
}


const loginSubscribe=async () => {
    try {
            const formData = new FormData(loginform);

            const data = {
                name: formData.get("username"),
                password: formData.get("password")
            };
            const response = await fetch(`${URL}Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) // Or use JSON.stringify(...) if needed
            });
            if (response.ok && localStorage.getItem("Login")===true) {
                window.location.href="./home.html";
            }
        } catch (error) {
        //    showMessage(error.message, 'error');
           console.log(error);
        }
    }

  