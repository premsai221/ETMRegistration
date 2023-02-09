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

function processOTP() {
    var emailInputElem = document.getElementById("email");
    var emailBtnElem = document.getElementById("email-btn");
    var otpInputElem = document.getElementById("otp");
    var otpBtnElem = document.getElementById("otp-btn");
    emailInputElem.classList.add("hide");
    emailBtnElem.classList.add("hide");
    otpInputElem.classList.remove("hide");
    otpBtnElem.classList.remove("hide");
}

async function verifyEmail() {
    var emailObj = getEmailObj();
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
        processOTP();
    } else {
        inValidEmail();
    }
}

async function verifyOTP () {
    const userOTP = document.getElementById("otp").value;
    const userEmail = document.getElementById("email").value
    const otpObj = {
        otp: userOTP,
        email: userEmail
    };
    var response = await fetch('/verifyotp', {
        method: 'POST',
        credentials: 'include',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(otpObj)
    });
    var {validOTP} = JSON.parse(await response.json());
    if (validOTP)
    {
        window.location = '/home';
    }
    else {
        alert("Inavlid OTP! Please try again.")
    }
}