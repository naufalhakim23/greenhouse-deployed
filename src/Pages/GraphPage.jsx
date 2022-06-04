import { useEffect } from "react";
import { AppShell, Grid } from '@mantine/core'
// // components
import { HeaderSearch } from "../components/Header";
import { NavbarMinimal } from "../components/Navbar";

export default function GraphPage() {
    // const [twentyTimestamp, settwentyTimestamp] = useState(null);
    // const [twentyRoomHumidity, setTwentyRoomHumidity] = useState(null);
    // const [twentyRoomTemperature, setTwentyRoomTemperature] = useState(null);
    // const [twentyPercentageSoilSensor1, setTwentyPercentageSoilSensor1] = useState(null);
    // const [twentyPercentageSoilSensor2, setTwentyPercentageSoilSensor2] = useState(null);
    useEffect(() => { })
    return (
        <>
            <AppShell
                styles={{
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                fixed
                navbar={
                    <NavbarMinimal />
                }
                header={<HeaderSearch />}
            >
                <Grid>
                    {/* <Grid.Col xs={7} >
                        <CardGraph 
                        dataFromDatabase={twentyRoomTemperatureValue}
                        dataTimestamp={twentyTimestampValue}
                         />
                    </Grid.Col>
                    <Grid.Col xs={7}>
                        <CardGraph
                        dataFromDatabase={twentyRoomHumidityValue}
                        dataTimestamp={twentyTimestampValue}
                        />
                    </Grid.Col>
                    <Grid.Col xs={7}>
                        <CardGraph
                        dataFromDatabase={twentyPercentageSoilSensor1Value}
                        dataTimestamp={twentyTimestampValue}
                        />
                    </Grid.Col>
                    <Grid.Col xs={7}>
                        <CardGraph
                        dataFromDatabase={twentyPercentageSoilSensor2Value}
                        dataTimestamp={twentyTimestampValue}
                        />
                    </Grid.Col> */}

                </Grid>


            </AppShell>
        </>
    )
}