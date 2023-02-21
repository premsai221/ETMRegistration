function getEmailObj() {
    let dataObj = {
        email: ""
    };
    var emailElem = document.getElementById("email");
    dataObj.email = emailElem.value;
    return dataObj;
}

function inValidEmail() {
    var emailElem = document.getElementById("email");
    emailElem.value = "";
    alert("Please enter a valid Email ID ");
}

function processPWD() {
    var emailInputElem = document.getElementById("email");
    var emailBtnElem = document.getElementById("email-btn");
    var pwdInputElem = document.getElementById("pwd");
    var pwdBtnElem = document.getElementById("pwd-btn");
    emailInputElem.classList.add("hide");
    emailBtnElem.classList.add("hide");
    pwdInputElem.classList.remove("hide");
    pwdBtnElem.classList.remove("hide");
}

async function verifyEmail() {
    var emailObj = getEmailObj();
    var emailBtnElem = document.getElementById("email-btn");
    emailBtnElem.style.visibility = 'hidden';
    var response = await fetch('/checkemail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(emailObj)
    });
    var {validUser} = JSON.parse(await response.json());
    if (validUser)
    {
        processPWD();
    } else {
        inValidEmail();
        emailBtnElem.style.visibility = 'visible';
    }
}

async function verifyPWD () {
    const userPWD = document.getElementById("pwd").value;
    const userEmail = document.getElementById("email").value
    var pwdBtnElem = document.getElementById("pwd-btn");
    pwdBtnElem.style.visibility = 'hidden';
    const pwdObj = {
        pwd: userPWD,
        email: userEmail
    };
    var response = await fetch('/verifypwd', {
        method: 'POST',
        credentials: 'include',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(pwdObj)
    });
    if (!response.redirected)
    {
        var {validPWD} = JSON.parse(await response.json());
        if (validPWD)
        {
            window.location = '/home';
        }
        else {
            alert("Inavlid password! Please try again.")
            pwdBtnElem.style.visibility = 'visible';
            document.getElementById("pwd").value = '';
        }
    } else {
        alert("Attempt expired! Please try again.");
        window.location = '/';
    }
}

const textToBeTyped = "Escape The Matrix";
var etmText = document.querySelector(".typed-text");
var i = 0;
const id = setInterval(typeText, 200)
function typeText() {
    etmText.innerHTML += textToBeTyped.charAt(i);
    i++;
    if (i >= textToBeTyped) {
        clearInterval(id);
    }
}
