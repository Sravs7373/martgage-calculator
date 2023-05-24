import { useContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContextStore from "../../store-context/ContextStore";
const MortgageListTable = (props)=>{
    const ctxStore = useContext(ContextStore);
    const navigate = useNavigate();
    const showDetailsHandler = ()=>{
        navigate(`/mort-list/${props.item.id}`)
    }
    const updateHandler = ()=>{
        props.updateHandler(props.item);
    }
    const deleteMortHandler = ()=>{
           const details = props.item;
            const newDetails = {
                details,
                type:'DELETE'
            }
            ctxStore.crudHandler(newDetails);
    }
    const [month,setMonth] = useState(props.item.startMonth);
    useEffect(()=>{
        if((props.item.startMonth==='10Oct'||props.item.startMonth==='11Nov'||props.item.startMonth==='12Dec')){
            setMonth(props.item.startMonth.slice(2))
        }
        else{
            setMonth(props.item.startMonth.slice(1));
        }
    },[props.item.startMonth])
    return(
        <tr>
            <td>{props.i}</td>
            <td>{props.item.loanAmount}</td>
            <td>{props.item.interestRate}</td>
            <td>{props.item.timePeriod}</td>
            <td>{month}</td>
            <td>{props.item.startYear}</td>
            <td><div className="flex btn-crowd"><button className="upate" onClick={updateHandler}>Update</button><button className="delete" onClick={deleteMortHandler}>Delete</button><button className="details" onClick={showDetailsHandler}>Details</button></div></td>
        </tr>
    )
}
export default MortgageListTable;