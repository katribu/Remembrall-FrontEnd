// First try to randomize function times for the alarm type notifications
export function alarmNotification(chosenTime,currentTime,message) {
    if (currentTime === chosenTime) {
        alert(`
        It is ${currentTime}!
        ${message}`)
        return;
    }
    if (currentTime > chosenTime) {
        return;
    } 
    return;
};


// Randomize function for use with random pushes within set time
function randomizeSetTime(startTime, endTime) {
    const hours = startTime + (Math.floor(Math.random() * (endTime - startTime)))
    const minutes = Math.floor(Math.random() * 60)
    const hoursString = hours.toLocaleString('no-NO', { minimumIntegerDigits: 2, });
    const minutesString = minutes.toLocaleString('no-NO', { minimumIntegerDigits: 2, });
    const randomTime = (hoursString + ":" + minutesString)
    return randomTime
};
/* randomizeSetTime(0, 2); */

