import {Pie} from "react-chartjs-2";
import {UserData} from "../../pages/Home";
import { Chart as ChartJS } from "chart.js/auto";
import {useState} from "react";
function PieChart() {
    const [userData] = useState({
        options: {
            maintainAspectRatio: false
        },
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Траты",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });
    return <Pie className={"max-w-md w-full h-auto"} data={userData}/>
}
export default PieChart