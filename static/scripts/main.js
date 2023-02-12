function unHide(classSelector) {
    const dropDownDiv = document.querySelector("."+classSelector);
    dropDownDiv.classList.toggle("hide");
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
    for (keys in slots)
    {
        const radioHtml = returnSlotRadio(keys, slots[keys].timeslot, slots[keys].freeSlots, slots[keys].day);
        if (slots[keys].day === 1)
        {
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
    if (!response.redirected){
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
        if (slotElem.checked){
            val = slotElem;
        }
    })
    return val;
}

async function registerBtnClicked(){
    const checkedElem = checkIfSlotSelected();
    if (checkedElem !== false) {
        var confirmed = confirm(`Do you want to book the slot ${checkedElem.value}`);
    }
    else {
        alert("Please select a Slot");
    }
    if (confirmed){
        const slotObj = {
            timeslot:checkedElem.value,
            day:checkedElem.getAttribute("data-day")
        }
        console.log(slotObj);
        var response = await fetch('/home/bookslot', {
            method: 'POST',
            credentials: 'include',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(slotObj)
        });
        if (!response.redirected){
            var resObj = JSON.parse(await response.json());
            if (resObj.booked)
            {
                alert(resObj.message);
                window.location = '/';
            }
            else {
                alert(resObj.message);
                fetchSlotData();
            }
        }
        else {
            sessionExpired();
        }
    } else {
        checkedElem.checked = false;
    }
}

fetchSlotData();