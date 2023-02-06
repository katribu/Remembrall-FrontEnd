
// first can try to randomize function times for the alarm type notifications

export default function firstNotification(chosenTime){
    const date = new Date()
    let timeOfDay = date.toLocaleString('no-NO', {
        hour: '2-digit',
        minute: '2-digit',
      })
    console.log(timeOfDay)
    if(timeOfDay === chosenTime){
       alert(`It is this ${timeOfDay}`)
       return;
    }
    if(timeOfDay > chosenTime ){
        return;
    }else{
       setTimeout(()=>{
        firstNotification(chosenTime)
        return;
       },60000) 
    }
}

function randomize(array){
    const result =  array[Math.floor(Math.random() * array.length)]
    return result
}
