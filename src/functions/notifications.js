import { MdAlarm } from "react-icons/md";

// First try to randomize function times for the alarm type notifications
export function alarmNotification(chosenTime) {
    const date = new Date()
    let timeOfDay = date.toLocaleString('no-NO', {
        hour: '2-digit',
        minute: '2-digit',
    })
    console.log(timeOfDay)
    if (timeOfDay === chosenTime) {
        alert(`It is this ${timeOfDay}`)
        return;
    }
    if (timeOfDay > chosenTime) {
        return;
    } else {
        setTimeout(() => {
            firstNotification(chosenTime)
            return;
        }, 5000)
    }
};


// Randomize function for use with random pushes within set time.
function randomizeSetTime(startTime, endTime) {
    const hours = startTime + (Math.floor(Math.random() * (endTime - startTime)))
    const minutes = Math.floor(Math.random() * 60)
    const hoursString = hours.toLocaleString('no-NO', { minimumIntegerDigits: 2, });
    const minutesString = minutes.toLocaleString('no-NO', { minimumIntegerDigits: 2, });
    const randomTime = (hoursString + ":" + minutesString)
    return randomTime
};

randomizeSetTime(0, 2);



/* ID  TYPE     JSON
[
{ID:1,   TYPE:alarm;    JSON: {id: id, time:time, days: {monday: true, tuesday: false}}}

2   GEO     {id: id, location: {lng: 50, lat: 40}}
] */

