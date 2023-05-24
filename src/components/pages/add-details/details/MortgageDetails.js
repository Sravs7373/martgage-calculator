import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ContextStore from "../../../store-context/ContextStore";
import './MortgageDetails.css';
import YearsCalculation from "./YearsCalculation";
import TableYear from "./TableYear";
import SingleData from "./SingleData";
import BarChartsDisplay from "./BarChartsDisplay";
import { DocumentTitle } from "../../../DocumentTitle";

const MortgageDetails = ()=>{
    DocumentTitle('Mortgage History');
    const id = useParams();
    let amtArr = [];
    let intArr = [];
    let yearsArr = [];
    let balanceArr = [];
    let emiArr = [];
    // EMI = P x (r / n) x (1 + r / n)^n(t)] / (1 + r / n)^n(t) - 1 // formula for emi calculations
    const mortInfo = useContext(ContextStore).mortgageList;
    const filteredMort = mortInfo.filter((val)=>val.id==id.mortId);
    const newData = filteredMort[0];
    let month = +(newData.startMonth==='10Oct'||newData.startMonth==='11Nov'||newData.startMonth==='12Dec'?newData.startMonth.substring(0,2):newData.startMonth.charAt(0));
    const NumYears = month===1?+newData.timePeriod:+newData.timePeriod+1;
    const [arrYears,setArrYears] = useState(YearsCalculation(NumYears,+newData.startYear));
    let loanAmount = +newData.loanAmount; 
    const n = 12; //12months
    const R = (+newData.interestRate/100)/n;  //the rate of interest applicable on the loan amount on a monthly basis
    const powValueNum = Math.pow((1+(R)),n*newData.timePeriod);
    const emi = ((loanAmount*(R)*(powValueNum/(powValueNum-1))));
    let totalPrinciple = 0;
    let totalInterest = 0;
    return(
        <div className="container mortgage-data-showing">
            <h3 className="mortgage-details-heading">Mortgage Details</h3>
            <SingleData data={newData}/>
            <table className="mortdetails-list-table">
                    <tbody>
                        <tr className="mort-head">
                            <th className="year">Year</th>
                            <th className="principal">Principal<br/> (A)</th>
                            <th className="interest">Interest<br/> (B)</th>
                            <th className="payment">Total Payment<br/> (A+B)</th>
                            <th className="balance">Balance</th>
                        </tr>
                        {
                                arrYears.map((y,i)=>{
                                    let totalCI = 0;
                                    let totalpA = 0;
                                    let totalEMI = 0;
                                    if(i===0){
                                        for(;month<=12;month++){
                                            const cI = (loanAmount*(R));
                                            const pA = (emi-cI);
                                            loanAmount -= pA; 
                                            totalCI += cI;
                                            totalpA +=pA;
                                            totalEMI +=emi;
                                        }
                                    }
                                    if(i>0 && (i<arrYears.length-1)){
                                        for(let monStart = 1;monStart<=12;monStart++){
                                            const cI = (loanAmount*(R));
                                            const pA = (emi-cI);
                                            loanAmount -= pA; 
                                            totalCI += cI;
                                            totalpA +=pA;
                                            totalEMI +=emi;
                                        }
                                    }
                                    if(i===arrYears.length-1){
                                        let newMonth = +newData.startMonth.charAt(0);
                                        let lastMonth = newMonth===1?12:newMonth-1;
                                        for(let monStart = 1;monStart<=lastMonth;monStart++){
                                                const cI = (loanAmount*(R));
                                                const pA = (emi-cI);
                                                loanAmount -= pA; 
                                                totalCI += cI;
                                                totalpA +=pA;
                                                totalEMI +=emi;
                                                if(monStart===lastMonth){
                                                    loanAmount=0;
                                                }
                                                }          
                                    }
                                    
                                    totalPrinciple += totalpA;
                                    totalInterest +=  totalCI;
                                    yearsArr.push(y);
                                    intArr.push(Math.floor(totalCI))
                                    amtArr.push(Math.floor(totalpA));
                                    balanceArr.push(Math.floor(loanAmount));
                                    emiArr.push(Math.floor(totalEMI))
                                    return <TableYear key={i+'s'} pA={totalpA} cI={totalCI} emi={totalEMI} p={loanAmount} year={y}/>
                                })
                            }
                    </tbody>
            </table>
            <div className="mortgage-cal-showing flex">
                    <div className="total-showing">
                        <h5>Loan EMI <br/><span className="span">&#x20B9; {Math.ceil(emi)}</span></h5>
                    </div>
                    <div className="total-showing">
                        <h5>Total Interest Payable <br/><span className="span">&#x20B9; {Math.ceil(totalInterest)}</span></h5>
                    </div>
                    <div className="total-showing">
                        <h5>Total Payment (Principal + Interest) <br/><span className="span">&#x20B9; {Math.ceil(totalInterest+totalPrinciple)}</span></h5>
                    </div>
            </div>
            <BarChartsDisplay amtArr={amtArr} yearsArr={yearsArr} balanceArr={balanceArr} intArr={intArr} emiArr={emiArr}/>
        </div>
    )
}
export default MortgageDetails;