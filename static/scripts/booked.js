async function getSlotInfo() {
    const response = await fetch('/home/getslotinfo', {
        method: 'get',
        credentials: 'include',
        redirect: 'follow'
    });
    if (!response.redirected) {
        const resObj = JSON.parse(await response.json());
        const infoElem = document.querySelector(".slot-info");
        var dateString = "Thursday 23/02/2023";
        if (resObj.day == 2) {
            dateString = "Friday 24/02/2023"
        }
        infoElem.innerHTML = `${resObj.timeslot} on ${dateString}`
    }
} 

getSlotInfo();