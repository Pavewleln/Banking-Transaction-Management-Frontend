import {Pie} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
import {useState} from "react";
function PieChart({UserData}) {
    const [userData, setUserData] = useState({
        options: {
            maintainAspectRatio: false
        },
        labels: UserData.map((data) => data.action),
        datasets: [
            {
                label: "Сумма",
                data: UserData.map((data) => data.sum),
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
    return <Pie className={"min-w-sm"} data={userData}/>
}

export default PieChart