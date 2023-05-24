import React from "react"
const ContextStore = React.createContext({
    loginList:[],
    modalClose:'',
    modalCloseHandler:()=>{},
    crudHandler:(item)=>{},
    openLogin:(item)=>{},
    globalUser:'',
    setGlobalUser:(name)=>{},
    mortgageList:[],
    mortgagePush:(item)=>{},
})
export default ContextStore;