import { Card, Text } from "@mantine/core";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


const graphOptions = {
    plugins: {
        legend: {
            display: false,
        },
    },
    responsive: true,
    maintainAspectRatio: true,
    tooltips: {
        mode: "index",
        intersect: false,
        enabled: false
    },
    scales: {
        y: {
            grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5]
            },
            ticks: {
                display: true,
                padding: 10,
                color: '#b2b9bf',
                font: {
                    size: 11,
                    family: "Open Sans",
                    style: 'normal',
                    lineHeight: 2
                },
            }
        },
        x: {
            grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5]
            },
            ticks: {
                display: true,
                color: '#b2b9bf',
                padding: 20,
                font: {
                    size: 11,
                    family: "Open Sans",
                    style: 'normal',
                    lineHeight: 2
                },
            }
        },
    },
}
function CardGraph(
    {
        dataFromDatabase,
        dataTimestamp,
        name
    }
) {

    const dataTimestampHour = dataTimestamp?.map((item) => {
        const date = new Date(item);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    })

    const Data = {
        labels: dataTimestampHour,
        datasets: [{
            data: dataFromDatabase,
            pointRadius: 1,
            tension: 0.4,
            borderWidth: 3,
            borderColor: "#cb0c9f",
            backgroundColor: 'rgba(203,12,159,0.2)',
            fill: true,
            maxBarThickness: 6
        }],
    }
    return (
        <Card shadow="sm" p="lg"
        >
            <Text variant="h6">Graph {name}</Text>
            <Line data={Data} options={graphOptions} />
        </Card>
    )
}
export default CardGraph;