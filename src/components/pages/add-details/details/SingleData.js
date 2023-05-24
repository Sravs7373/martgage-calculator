import { useEffect, useState } from "react";

const SingleData = (props)=>{
    const [month,setMonth] = useState(0);
    useEffect(()=>{
        if((props.data.startMonth==='10Oct'||props.data.startMonth==='11Nov'||props.data.startMonth==='12Dec')){
            setMonth(props.data.startMonth.slice(2))
        }
        else{
            setMonth(props.data.startMonth.slice(1));
        }
    },[month])
    
    return(
            <ul className="flex single-data-display">
                <li>Loan Amount : &#x20B9; {props.data.loanAmount}</li>
                <li>Interest Rate : {props.data.interestRate}%</li>
                <li>Time Period : {props.data.timePeriod}years</li>
                <li>Start Month : {month}</li>
                <li>Start Year : {props.data.startYear}</li>
            </ul>
    )
}
export default SingleData;