import HeaderList from "./HeaderList";
import './Header.css';
import { useNavigate } from "react-router-dom";
const navigationList = [
    {
        id:1,
        name:'Welcome',
        slug:'/welcome'
    },
    {
        id:2,
        name:'Login',
        slug:'/login'
    },
    {
        id:3,
        name:'Add Details',
        slug:'/mort-list'
    },
    {
        id:4,
        name:'Logout',
        slug:'/logout'
    },
    
]
const Header = ()=>{
    const login = localStorage.getItem('login');
    const navigate = useNavigate();
    const onClickHandler = ()=>{
        localStorage.removeItem('login');
        localStorage.removeItem('globalUser');
        navigate('/login');
    }
    return(
        <div className="header-main-area">
            <div className="container">
                <nav>
                    <ul className="nav-list flex">
                        {
                            navigationList.map((val,i)=>{
                                if(login && val.slug==='/login'){
                                    return
                                }
                                if(!login && (val.slug==='/logout' || val.slug==='/mort-list')){
                                    return
                                }
                                if(val.slug==='/logout'){
                                    return  <HeaderList key={i+'s'} list={val} s={(navData)=>navData.isActive?'acitve':''} onClick={onClickHandler}/>
                                }
                                return  <HeaderList key={i+'s'} list={val} s={(navData)=>navData.isActive?'acitve':''}/>
                            })
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}
export default Header;