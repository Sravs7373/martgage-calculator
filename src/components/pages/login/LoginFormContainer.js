import { DocumentTitle } from '../../DocumentTitle';
import LoginForm from './LoginForm';
import './LoginForm.css';
const LoginFormContainer = ()=>{
    DocumentTitle('Login Form');
    return(
        <div className="login-form-main-area flex">
            <div className="login-form-left">
               
            </div>
            <div className="login-form-right">
                <LoginForm />
            </div>            
        </div>
    )
}
export default LoginFormContainer;