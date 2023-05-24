import './ModalBox.css';
const ModalBox = (props)=>{
    const clasNames = "main-overlay-area "+props.className;
    return(
        <div className={clasNames}>
            <div className="overlay-container">
                {
                    props.children
                }
            </div>
        </div>
    )
}
export default ModalBox;