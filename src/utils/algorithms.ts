export const addPMorAM = (hour)=>{
    
    return (hour >= 12) ?  `${hour}:00pm`: 
                (hour < 10)? `0${hour}:00am`:`${hour}:00am` ;
}