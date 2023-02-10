function unHide(classSelector) {
    const dropDownDiv = document.querySelector("."+classSelector);
    dropDownDiv.classList.toggle("hide");
}

function returnSlotRadio(id, timeslot, freeSlots) {
    return `<div class="input-radio-container">
    <input class="radio" type="radio" name="slot" id="${id}" value="${timeslot}">
    <label for="${id}">
        <div><span class="label-timing">${timeslot}</span> <br>
            <span class="label-slot-info">Free Slots: ${freeSlots}/12</span>
        </div>
    </label>
</div>`
}

function returnSlotInnerHTML(slots) {
    var dayOne = document.querySelector(".day-one");
    var dayTwo = document.querySelector(".day-two");
    for (keys in slots)
    {
        const radioHtml = returnSlotRadio(keys, slots[keys].timeslot, slots[keys].freeSlots);
        if (slots[keys].day === 1)
        {
            dayOne.innerHTML += radioHtml;
        }
        else {
            dayTwo.innerHTML += radioHtml;
        }
    }
}

async function fetchSlotData() {
    var response = await fetch('/home/getslots', {
        method: 'GET'
    });
    var slots = JSON.parse(await response.json()).slots;
    returnSlotInnerHTML(slots);
} 

fetchSlotData();