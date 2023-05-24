import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContextStore from "./ContextStore";
const initialList = [
    {
        id:1,
        loanAmount:500000,
        interestRate:5,
        timePeriod:20,
        startMonth:'1Jan',
        startYear:2020
},
{
    id:2,
    loanAmount:600000,
    interestRate:8,
    timePeriod:30,
    startMonth:'1Jan',
    startYear:2021
}
]
const updatesHandler = (state,action)=>{
    if(action.type==='ADD'){
        return [...state,action.item]
    }
    if(action.type==='UPDATE'){
        const newItems = state.map((val,i)=>{
            if(val.id==action.item.id){
                return Object.assign({},val,{
                    id:val.id,
                    loanAmount:action.item.loanAmount,
                    interestRate:action.item.interestRate,
                    timePeriod:action.item.timePeriod,
                    startMonth:action.item.startMonth,
                    startYear:action.item.startYear
                })
             }
             else{
                  return val
             }
        });
        return newItems
    }
    if(action.type==='DELETE'){
        const deleteItems = state.filter((val,i)=>{
            return val.id!==action.item.id;
        })
        return deleteItems;
    }
}
const ContextProvider = (props)=>{
    const [modal,setModal] = useState(false);
    const [userLoginList,setUserLoginList] = useState([
        {
            id:1,
            userName:'Sravanthi',
            passWord:'123456'
        },
        {
            id:2,
            userName:'Swetha',
            passWord:'123456'
        }
    ]);
    const [initialMortgageList,dispatchMortgageList] = useReducer(updatesHandler,initialList);
    const [globalUser,setGlobalUser] = useState('');
    const navigate = useNavigate();
    localStorage.setItem('loginData',JSON.stringify(userLoginList));
    const crudHandler = (item)=>{
        dispatchMortgageList(
            {type:item.type,
            item:item.details})
    }
    const openLoginHandler = (item)=>{
        localStorage.setItem('login',1);
        navigate('/welcome');
    }
    const setGloablUserHandler = (item)=>{
        console.log(item)
        setGlobalUser(item);
    }
    const updateMortgageHandler = (item)=>{
        console.log(item)
    }
    const modalCloseHandler = (item)=>{
        setModal(item)
    }
 const ctxStore = {
    loginList:userLoginList,
    globalUser:globalUser,
    mortgageList:initialMortgageList,
    modalClose:modal,
    modalCloseHandler:modalCloseHandler,
    crudHandler:crudHandler,
    openLogin:openLoginHandler,
    setGlobalUser:setGloablUserHandler,
    mortgagePush:updateMortgageHandler,
 }
 return(
    <ContextStore.Provider value={ctxStore}>
        {props.children}
    </ContextStore.Provider>
 )
}
export default ContextProvider;