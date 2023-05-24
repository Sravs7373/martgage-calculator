export const AddMortMonths = ()=>{
    const monthsCodes = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
    const options = monthsCodes.map((val,i)=>{
        return <option value={i+1+val} key={i+'months'}>{val}</option>
    })
    return options;
}
export const AddMortYears = ()=>{
        let numYears = [];
        for(let i=1990;i<=2030;i++){
            numYears.push(i);
        }
        const yearsOptions = numYears.map((val,i)=>{
            return <option value={val} key={i+'years'}>{val}</option>
        })
        return yearsOptions;
}