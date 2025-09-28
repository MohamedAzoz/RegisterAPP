// ChangePassword
// ConfirmEmail
// CheckEmail

'use strict';

let IsError=false;
let form=document.getElementById("form");
let emailform=document.getElementById("emailform");
let ChangePasswordform=document.getElementById("ChangePasswordform");
let Msg=document.getElementById("msg");
let email=/^[a-zA-Z0-9]+@gmail\.com$/;
let password=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

let URL='https://registerapi.runasp.net/api/Account/';

async function CheckEmail() {
    // FormData and condition are not defined; remove or implement as needed
    let elements = new FormData(emailform);
    
    if (!email.test(elements.get("email"))) {
        IsError=true;
        document.getElementById("Email").classList.add("is-invalid");
    }
   else{
       emailSubscribe();
    }

}
const emailSubscribe=async () => {
         try {
            const formData = new FormData(emailform);
            const data = {
                email: formData.get("email")
            };

            const response = await fetch(`${URL}CheckEmail`, {
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
                    localStorage.setItem("Email",true)
            }
        } catch (error) {
           showMessage(error.message, 'error');
        //    console.log(error);
            localStorage.setItem("Email",false)
        }
    }
const showMessage = (message, type = 'success') => {
    Msg.innerHTML = `
        <div class="alert alert-${type}">
        ${message}
        </div>
    `;
    // if (type==='success') {
    //     setTimeout(()=>{
    //         window.location.href="./Code.html";
    //     },1000)
    // }
};

let searchparams=new URLSearchParams(window.location.search)
let userId=searchparams.get("userId")
let token=searchparams.get("token")
// console.log("token = "+token);

try { token = decodeURIComponent(token); } catch(e){}



async function ResetPassword() {
    IsError=false;
    let elements = new FormData(ChangePasswordform);    
    
    if (!password.test(elements.get("password"))) {
        IsError=true;
        document.getElementById("Password").classList.add("is-invalid");
    }
     if (!password.test(elements.get("passwordConfirmed")) || !(elements.get("passwordConfirmed")===elements.get("password"))) {
        IsError=true;
        document.getElementById("PasswordConfirmed").classList.add("is-invalid");
    }
   if(IsError===false){
       passwordSubscribe();
    }    
}

const passwordSubscribe=async () => {
    try {
            const formData = new FormData(ChangePasswordform);
            const data = {
                UserId:userId,
                Token:token,
                Password: formData.get("password"),
                PasswordConfirmed:formData.get("passwordConfirmed")
            };

            const response = await fetch(`${URL}ResetPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                window.location.href="./Login.html"
                if(response.status==200)
                    localStorage.setItem("Password",true);
            }else {
                const err = await response.json().catch(()=>null);
                console.error('Failed', response.status, err);
                // اعرض الأخطاء للمستخدم
                localStorage.setItem("Password",false)   
            }
        } catch (error) {
            showMessage(error.message, 'error');
            localStorage.setItem("Password",false)
            console.log(error);           
        }
    }
