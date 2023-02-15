function unHide(classSelector) {
    const dropDownDiv = document.querySelector("." + classSelector);
    dropDownDiv.classList.toggle("hide");
}

function alertEvent(msgTypeText, msgText) {
    document.querySelector(".container").classList.add("hide");
    const alertContainer = document.querySelector(".alert-container");
    const msgType = alertContainer.querySelector(".message-type");
    const msg = alertContainer.querySelector(".message");
    msgType.innerHTML = msgTypeText;
    msg.innerHTML = msgText;
    alertContainer.classList.remove("hide");
}

function alertBtnOkay() {
    const alertContainer = document.querySelector(".alert-container");
    if (alertContainer.getAttribute("data-prompt") == "no") {
        alertContainer.classList.add("hide");
        document.querySelector(".container").classList.remove("hide");
    } else {
        alertContainer.setAttribute("data-prompt", "no");
        registerSlot();
    }
}

function alertBtnCancel() {
    const alertContainer = document.querySelector(".alert-container");
    const checkedElem = checkIfSlotSelected();
    const cancelBtn = alertContainer.querySelector("#btn-cancel");
    alertContainer.setAttribute("data-prompt", "no");
    alertContainer.classList.add("hide");
    cancelBtn.classList.add("hide");
    checkedElem.checked = false;
    document.querySelector(".container").classList.remove("hide");
}

function confirmEvent(msgText) {
    document.querySelector(".container").classList.add("hide");
    const alertContainer = document.querySelector(".alert-container");
    alertContainer.setAttribute("data-prompt", "yes");
    const msgType = alertContainer.querySelector(".message-type");
    const msg = alertContainer.querySelector(".message");
    const cancelBtn = document.getElementById("btn-cancel");
    cancelBtn.classList.remove("hide");
    msgType.innerHTML = "CONFIRM";
    msg.innerHTML = msgText;
    alertContainer.classList.remove("hide");
}

async function registerSlot() {
    const checkedElem = checkIfSlotSelected();
    const alertContainer = document.querySelector(".alert-container");
    const loadingPage = document.querySelector(".loading-page");
    loadingPage.classList.remove("hide");
    alertContainer.classList.add("hide");
    const cancelBtn = alertContainer.querySelector("#btn-cancel");
    cancelBtn.classList.add("hide");
    const slotObj = {
        slotid: checkedElem.id
    }
    var response = await fetch('/home/bookslot', {
        method: 'POST',
        credentials: 'include',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(slotObj)
    });
    if (!response.redirected) {
        var resObj = JSON.parse(await response.json());
        if (resObj.booked) {
            window.location = "/home";
        }
        else {
            loadingPage.classList.add("hide");
            document.querySelector(".container").classList.remove("hide");
            alertEvent("OOPS", resObj.message);
            fetchSlotData();
        }
    }
    else {
        sessionExpired();
    }
}

function returnSlotRadio(id, timeslot, freeSlots, day) {
    return `<div class="input-radio-container">
    <input class="radio" type="radio" name="slot" id="${id}" value="${timeslot}" data-day=${day}>
    <label for="${id}">
        <div><span class="label-timing">${timeslot}</span> <br><br>
            <span class="label-slot-info">Free Slots: <br>${freeSlots}</span>
        </div>
    </label>
</div>`
}

function returnSlotInnerHTML(slots) {
    var dayOne = document.querySelector(".day-one");
    var dayTwo = document.querySelector(".day-two");
    dayOne.innerHTML = "";
    dayTwo.innerHTML = "";
    for (keys in slots) {
        const radioHtml = returnSlotRadio(slots[keys].slotid, slots[keys].timeslot, slots[keys].freeSlots, slots[keys].day);
        if (slots[keys].day === 1) {
            dayOne.innerHTML += radioHtml;
        }
        else {
            dayTwo.innerHTML += radioHtml;
        }
    }
}

function sessionExpired() {
    alert("Session expired please login again");
    window.location = '/';
}

async function fetchSlotData() {
    var response = await fetch('/home/getslots', {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.redirected) {
        var slots = JSON.parse(await response.json()).slots;
        returnSlotInnerHTML(slots);
    }
    else {
        sessionExpired();
    }
}

function checkIfSlotSelected() {
    var val = false;
    document.getElementsByName("slot").forEach((slotElem) => {
        if (slotElem.checked) {
            val = slotElem;
        }
    })
    return val;
}

async function registerBtnClicked() {
    const checkedElem = checkIfSlotSelected();
    if (checkedElem !== false) {
        confirmEvent(`Do you want to book the slot ${checkedElem.value}`);
    }
    else {
        alertEvent("ERROR", "Please select a Slot");
    }

}

fetchSlotData();