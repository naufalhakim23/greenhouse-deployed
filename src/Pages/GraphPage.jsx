import { useState, useEffect } from "react";
import { AppShell, Grid } from '@mantine/core'
// // components
import CardGraph from "../components/Graph";
import { HeaderSearch } from "../components/Header";
import { NavbarMinimal } from "../components/Navbar";
// // interaction with the API
import { db } from "../Firebase/Firebase";
import { ref, onValue, limitToLast, query } from "firebase/database";

export default function GraphPage() {
    const [twentyTimestamp, settwentyTimestamp] = useState(null);
    const [twentyRoomHumidity, setTwentyRoomHumidity] = useState(null);
    const [twentyRoomTemperature, setTwentyRoomTemperature] = useState(null);
    const [twentyPercentageSoilSensor1, setTwentyPercentageSoilSensor1] = useState(null);
    const [twentyPercentageSoilSensor2, setTwentyPercentageSoilSensor2] = useState(null);
    const getDataForGraph20 = () => {
        const dataRTDB = ref(db, "node/database/");
        const lastDataRTDBtoTwenty = query(dataRTDB, limitToLast(20));
        onValue(lastDataRTDBtoTwenty, (snapshot) => {
            const data = snapshot.val();
            var item = Object.keys(data).map(function (key) {
                return data[key];
            });
            // get only roomTemperature from data
            var roomTemperature = item.map(function (item) {
                return item?.roomTemperature;
            });
            // get only roomHumidity from data
            var roomHumidity = item.map(function (item) {
                return item?.roomHumidity;
            });
            // get only soil moisture percentage from data
            var percentageSoilSensor1 = item.map(function (item) {
                return item?.percentageSoilSensor1;
            });
            var percentageSoilSensor2 = item.map(function (item) {
                return item?.percentageSoilSensor2;
            });
            // get only timestamp from data
            var timestamp = item.map(function (item) {
                return item?.Ts;
            });
            settwentyTimestamp(timestamp);
            setTwentyRoomHumidity(roomHumidity);
            setTwentyRoomTemperature(roomTemperature);
            setTwentyPercentageSoilSensor1(percentageSoilSensor1);
            setTwentyPercentageSoilSensor2(percentageSoilSensor2);
        });
    };
    useEffect(() => {
        getDataForGraph20();
    }, []);
    return (
        <>
            <AppShell
                styles={{
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                fixed
                navbar={
                    <NavbarMinimal
                    />
                }
                header={<HeaderSearch />}
            >
                <Grid>
                    <Grid.Col xs={6}>
                        <CardGraph
                            dataFromDatabase={twentyRoomTemperature}
                            dataTimestamp={twentyTimestamp}
                        />
                    </Grid.Col>
                    <Grid.Col xs={6}>
                        <CardGraph
                            dataFromDatabase={twentyRoomHumidity}
                            dataTimestamp={twentyTimestamp}
                        />
                    </Grid.Col>
                    <Grid.Col xs={6}>
                        <CardGraph
                            dataFromDatabase={twentyPercentageSoilSensor1}
                            dataTimestamp={twentyTimestamp}
                        />
                    </Grid.Col>
                    <Grid.Col xs={6}>
                        <CardGraph
                            dataFromDatabase={twentyPercentageSoilSensor2}
                            dataTimestamp={twentyTimestamp}
                        />
                    </Grid.Col>
                </Grid>


            </AppShell>
        </>
    )
}