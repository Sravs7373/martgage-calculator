import { NavLink } from "react-router-dom";
const HeaderList = (props)=>{
    return(
        <li onClick={props.onClick}><NavLink to={props.list.slug} className={props.classFun}>{props.list.name}</NavLink></li>
    )
}
export default HeaderList;