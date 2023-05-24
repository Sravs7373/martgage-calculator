import ModalBox from "../modal-box/ModalBox";
import MortForm from "./MortForm";
const AddModal = (props)=>{
    return(
        <ModalBox><div className="mort-model-container">
                <MortForm onClose={props.onClose} />
              </div> 
         </ModalBox>
)
}
export default AddModal;