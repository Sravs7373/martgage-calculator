import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
const BarChartsDisplay = (props)=>{
    const labels = props.yearsArr;
    const principal = props.amtArr;
    const balance = props.balanceArr;
    const interest = props.intArr;
    const emi = props.emiArr;
    const data = {
        labels,
        datasets:[
            {
                label:'Balance Amount',
                data:balance,
                backgroundColor:'#FF4A4A'
            },
            {
                label:'Principal Amount',
                data:principal,
                backgroundColor:'#5BB318'
            },
            {
                label:'Interest Amount',
                data:interest,
                backgroundColor:'#242F9B'
            },
            {
                label:'EMI Amount',
                data:emi,
                backgroundColor:'#6FEDD6'
            }
        ]
    }
    return(
        <div>
            <Bar data={data} />
        </div>
    )
}
export default BarChartsDisplay;