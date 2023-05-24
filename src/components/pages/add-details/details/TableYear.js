const TableYear = (props)=>{
    return(
        <tr className="table-list-item">
        <td>{props.year}</td>
        <td>&#x20B9; {Math.floor(props.pA)}</td>
        <td>&#x20B9; {Math.ceil(props.cI)}</td>
        <td>&#x20B9; {Math.floor(props.emi)}</td>
        <td>&#x20B9; {Math.ceil(props.p)}</td>
     </tr>
    )
}
export default TableYear;