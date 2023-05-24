import { useContext, useState } from "react";
import uuid from "react-uuid";
import ContextStore from "../store-context/ContextStore";
import { AddMortMonths } from "./AddMonthsYears";
import { AddMortYears } from "./AddMonthsYears";
const MortForm = (props)=>{
    const ctxStore = useContext(ContextStore);
    const [mortInputs,setMortInputs] = useState({
        id:props.id||'',
        loanAmount:props.loanAmount||'',
        interestRate:props.interestRate||'',
        timePeriod:props.timePeriod||'',
        startMonth:props.startMonth||'',
        startYear:props.startYear||''
    });
    const [errors,setErros] = useState({
        loanAmount:'',
        interestRate:'',
        timePeriod:'',
        startMonth:'',
        startYear:''
    });
    const validationHandler = (mortDetails)=>{
        let fieldErros = errors;
        if(!mortDetails.loanAmount) fieldErros['loanAmount'] = 'Loan Amount Required';
        else fieldErros['loanAmount'] = '';
        if(!mortDetails.interestRate) fieldErros['interestRate'] = 'Interest Rate Required';
        else fieldErros['interestRate'] = '';
        if(!mortDetails.timePeriod) fieldErros['timePeriod'] = 'Time period Required';
        else fieldErros['timePeriod'] = '';
        if(!mortDetails.startMonth) fieldErros['startMonth'] = 'Month Required';
        else fieldErros['startMonth'] = '';
        if(!mortDetails.startYear) fieldErros['startYear'] = 'Year Required';
        else fieldErros['startYear'] = '';
        return  setErros({...fieldErros});
    }
    const grabFormInputs = (e)=>{
        const newMortInputs = mortInputs;
        newMortInputs[e.target.name] = e.target.value;
        setMortInputs({...newMortInputs})
    }
    const mortSubmitHandler = (e)=>{
        const details = mortInputs;
        validationHandler(details);
        e.preventDefault();
        if(!mortInputs.loanAmount || !mortInputs.interestRate || !mortInputs.timePeriod || !mortInputs.startMonth || !mortInputs.startYear) return;
        if(props.id){
            props.editFormData(details);
            ctxStore.modalCloseHandler(false);
        }
       else{
            details['id']= uuid();
            const newDetails = {
                details,
                type:'ADD'
            }
            ctxStore.crudHandler(newDetails)
            ctxStore.modalCloseHandler(true);
            setMortInputs({
                loanAmount:'',
                interestRate:'',
                timePeriod:'',
                startMonth:'',
                startYear:''
            })
       }
    }
    const cancelHandler = ()=>{
        ctxStore.modalCloseHandler(false);
        if(!props.id){
            props.onClose()
        }
    }
    return(
        <div className="add-mort-form-area">
                <h5>{props.id?'Edit':'Add'} Mortgage Details</h5>
                <form onSubmit={mortSubmitHandler}>
                    <div className="mort-inputs-area flex">
                        <div className="loan-amount-area flex">
                            <input type='number' name='loanAmount' onChange={grabFormInputs} value={mortInputs.loanAmount} placeholder="Enter Loan Amount" className="loanAmount"/>
                            <span style={{color:'red'}}>{errors.loanAmount}</span>
                        </div>
                    </div>
                    <div className="mort-inputs-area flex">
                        <div className="span-input flex">
                            <input type='number' name='interestRate' value={mortInputs.interestRate} onChange={grabFormInputs} placeholder="Enter Interest Rate"/>
                            <span style={{color:'red'}}>{errors.interestRate}</span>
                        </div>
                        <div className="span-input flex">
                            <input type='number' name='timePeriod' value={mortInputs.timePeriod} onChange={grabFormInputs} placeholder="Enter Number Of Years"/>
                            <span style={{color:'red'}}>{errors.timePeriod}</span>
                        </div>
                    </div>
                    
                    <div className="mort-inputs-area flex">
                        <div className="span-input flex">
                            <select name='startMonth' value={mortInputs.startMonth}   onChange={grabFormInputs} >
                                <option value=''>Start Month</option>
                                {AddMortMonths()}
                            </select>
                            <span style={{color:'red'}}>{errors.startMonth}</span>
                        </div>
                        <div className="span-input flex">
                            <select name='startYear' value={mortInputs.startYear} onChange={grabFormInputs} >
                                <option value=''>Start Year</option>
                                {AddMortYears()}
                            </select>
                            <span style={{color:'red'}}>{errors.startYear}</span>
                        </div>
                    </div>
                    <div className="add-form-btn flex">
                        <button className="add-edit-btn">{props.id?'Edit':'Add'}</button>
                        <button className="cancel-btn" onClick={cancelHandler}>Close</button>
                    </div>
                </form>
        </div>
    )
}
export default MortForm;