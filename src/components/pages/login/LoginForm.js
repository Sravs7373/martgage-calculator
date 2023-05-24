import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import ContextStore from "../../store-context/ContextStore";

const LoginForm = ()=>{
    const ctxStore = useContext(ContextStore);
    const locatData = JSON.parse(localStorage.getItem('loginData'));
    const [formData,setFormData] = useState({
        userName:'',
        passWord:''
    });
    const [errors,setErros] = useState({
        userName:'',
        passWord:''
    });
    const validationHandler = (person)=>{
        let fieldErros = errors;
        if(!person.userName) fieldErros['userName'] = 'Username Required';
        else fieldErros['userName'] = '';
        if(!person.passWord) fieldErros['passWord'] = 'Password Required';
        else fieldErros['passWord'] = '';
        return  setErros({...fieldErros});
    }
    const onChageFormData = (e)=>{
        const newData = formData;
        newData[e.target.name] = e.target.value;
        setFormData({...newData});
    }
    const onClickFormData = (e)=>{
        const person = formData;
        validationHandler(person);
        e.preventDefault();
       if(!formData.userName || !formData.passWord) return;
       const filterLogin = locatData.filter((val,i)=>{
        return val.userName===formData.userName && val.passWord===formData.passWord;
       });
       if(filterLogin.length>0){
            ctxStore.openLogin(formData);
            localStorage.setItem('globalUser',formData.userName);
            setFormData({
                userName:'',
                passWord:'',
             });
       }
       else{
        alert('Invalid Credentials')
       }
    }
    return(
        <div className="form-login flex">
                <div className="left-container">
                    <FontAwesomeIcon icon={faLock} className='font-icon'/>
                    <h5 className="login-interface-text">Login Into Mortgage</h5>
                </div>
                <div className="right-container">
                     <h4>Login Form</h4>
                    <form onSubmit={onClickFormData}>
                        <div className="label-area flex">
                                <label htmlFor="username">Username</label>
                                <input type='text' id='username' value={formData.userName} name='userName'  onChange={onChageFormData} placeholder="Enter username"/>
                        </div>
                        <span style={{color:'red'}}>{errors.userName}</span>
                        <div className="label-area flex">
                                <label htmlFor="password">Password</label>
                                <input type='password' id='password' name='passWord' value={formData.passWord}  onChange={onChageFormData} placeholder="Enter password"/>
                        </div>
                        <span style={{color:'red'}}>{errors.passWord}</span>
                        <div>
                            <button className="btn-login btn">Login</button>
                        </div>
                    </form>
                </div>
        </div>
    )
}
export default LoginForm;