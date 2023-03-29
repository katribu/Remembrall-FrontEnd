

export function alarmNotification(chosenTime,currentTime,message,todaysDate,setDate,id,deletefn) {
    let text = `
    ${message}. 
    Click "Ok" delete.
    Click "cancel" in order to edit notification.`
    if (currentTime === chosenTime && todaysDate===setDate) {
        let snooze = window.confirm(`${text}`)
        if(snooze){
            deletefn(id)
            return;
        }else{
            return;
        }   
    }else{
        return;
    }
};


// Randomize function for use with random pushes within set time
// function randomizeSetTime(startTime, endTime) {
//     const hours = startTime + (Math.floor(Math.random() * (endTime - startTime)))
//     const minutes = Math.floor(Math.random() * 60)
//     const hoursString = hours.toLocaleString('no-NO', { minimumIntegerDigits: 2, });
//     const minutesString = minutes.toLocaleString('no-NO', { minimumIntegerDigits: 2, });
//     const randomTime = (hoursString + ":" + minutesString)
//     return randomTime
// };
/* randomizeSetTime(0, 2); */

