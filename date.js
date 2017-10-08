const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
function getActualMonths(){
    const reservingMonths = [];
    const currentMonthIndex= (new Date()).getMonth();
    let fromStart= 11-currentMonthIndex;
    for(let i = currentMonthIndex; i < currentMonthIndex + 4; i++){
        let arr= [];
        if(i < months.length){
            arr.push(months[i])
            reservingMonths.push(arr);
        }
        else{
            arr.push(months[i- months.length])
            reservingMonths.push(arr);
        }
    }
    return reservingMonths;
}

function getAllDaysForMonth(month){
    let indexOfMonths= months.indexOf(month);
    let data= new Date();
    data.setMonth(indexOfMonths);
    data.setDate(0);
    return data.getDate();
}

module.exports = {
    getActualMonths,
    getAllDaysForMonth
}