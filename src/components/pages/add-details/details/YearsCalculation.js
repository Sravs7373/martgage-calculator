const YearsCalculation = (n,year)=>{
    let y = year;
   let years = [];
    for(let i =0;i<n;i++){
        years.push(y);
        y++;
    }
    return years;
}
export default YearsCalculation;