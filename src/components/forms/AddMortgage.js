import MortForm from "./MortForm";
import './AddMortgage.css';
import ModalBox from "../modal-box/ModalBox";
const AddMortgage = (props)=>{
    return(
            <ModalBox><div className="mort-model-container">
                    <MortForm id={props.mortItem.id} loanAmount={props.mortItem.loanAmount} interestRate={props.mortItem.interestRate} timePeriod={props.mortItem.timePeriod} startMonth={props.mortItem.startMonth} startYear={props.mortItem.startYear} editFormData={props.editFormData}/>
                  </div> 
             </ModalBox>
    )
}
export default AddMortgage;