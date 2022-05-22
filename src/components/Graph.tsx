import { Card } from "@mantine/core";
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

const colors = {
    gray: {
        100: "#f6f9fc",
        200: "#e9ecef",
        300: "#dee2e6",
        400: "#ced4da",
        500: "#adb5bd",
        600: "#8898aa",
        700: "#525f7f",
        800: "#32325d",
        900: "#212529",
    },
    theme: {
        default: "#172b4d",
        primary: "#5e72e4",
        secondary: "#f4f5f7",
        info: "#11cdef",
        success: "#2dce89",
        danger: "#f5365c",
        warning: "#fb6340",
    },
    black: "#12263F",
    white: "#FFFFFF",
    transparent: "transparent",

}
const Data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        data: [65, 59, 80, 81, 56, 55, 40],
        tension: 0.4,
        borderWidth: 4,
        borderColor: colors.theme["primary"],
        backgroundColor: colors.transparent,
    }],
}
const graphOptions = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        display: false,
    },
    tooltips: {
        enabled: true,
        mode: "index",
        intersect: false,
    }
}
function CardGraph() {
    // const theme = useMantineTheme();

    // // const secondaryColor = theme.colorScheme === 'dark'
    // //     ? theme.colors.dark[1]
    // //     : theme.colors.gray[7];
    return (
        <Card>
            <Line data={Data} options={graphOptions} />
        </Card>
    )
}
export default CardGraph;