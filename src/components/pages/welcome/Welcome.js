import './Welcome.css';
import { DocumentTitle } from '../../DocumentTitle';
const Welcome = ()=>{
    DocumentTitle('Welcome');
    const globalUser = localStorage.getItem('globalUser')
    return(
        <div className="container">
            <div className="welcome-area">
                <h2>Welcome {globalUser || 'Here'}</h2>
            </div>
        </div>
    )
}
export default Welcome;