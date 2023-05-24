import { useContext, useState } from 'react';
import ContextStore from '../../store-context/ContextStore';
import './AddDetails.css';
import MortgageListTable from './MortgageListTable';
import AddMortgage from '../../forms/AddMortgage';
import AddModal from '../../forms/AddModal';
import { DocumentTitle } from '../../DocumentTitle';
const AddDetails = ()=>{
    DocumentTitle('Add Mortgage');
    const ctxStore = useContext(ContextStore);
    const mortList = ctxStore.mortgageList;
    const open = ctxStore.modalClose;
    const [mortItemsForUpdate,setMortItemsForUpdate] = useState('');
    const [addOpen,setAddOpen] = useState(false)
    const addItemModal = ()=>{
        setAddOpen(true);
    }
    const updateHandler = (item)=>{
        ctxStore.modalCloseHandler(true);
        setMortItemsForUpdate({...item})
    }
    const editFormData = (item)=>{
        const details = item;
        const newDetails = {
            details,
            type:'UPDATE'
        }
        ctxStore.crudHandler(newDetails);
    }
    const closeAddModalHandler = ()=>{
        setAddOpen(false);
    }
    return(
        <div className="add-details-main-area container">
            <h3>Mortgage List of Table</h3>  
            {open && <AddMortgage mortItem={mortItemsForUpdate} editFormData={editFormData}/>}
            {addOpen && <AddModal onClose={closeAddModalHandler}/>}
            <div className='mortgage-table-list'>
                <div className='add-area'><button className='add' onClick={addItemModal}>Add</button></div>
                <table className='mortgage-table'>
                    <tbody>
                        <tr>
                            <th>S.No</th>
                            <th>Loan Amount  (&#x20B9;)</th>
                            <th>Interest Rate (%)</th>
                            <th>Years</th>
                            <th>Start Month</th>
                            <th>Start Year</th>
                            <th>Actions</th>
                        </tr>{
                            mortList.map((item,i)=>{
                                return <MortgageListTable key={i+'m'} item={item} i={i+1} updateHandler={updateHandler}/>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AddDetails;