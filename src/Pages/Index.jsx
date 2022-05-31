import { useState, useEffect } from "react";
import { AppShell, useMantineTheme, Grid } from '@mantine/core'
import { HeaderSearch } from "../components/Header";
import { NavbarMinimal } from "../components/Navbar";
import { StatsGrid } from "../components/Status";
import CardGraph from "../components/Graph";


import { db } from "../Firebase/Firebase";
import { ref, onValue, limitToLast, query } from 'firebase/database'

function MainDashboard() {
    const [dataInterface, setDataInterface] = useState({
        bitSoilSensor1: 0,
        bitSoilSensor2: 0,
        percentageSoilSensor1: 0,
        percentageSoilSensor2: 0,
        roomHumidity: 0,
        roomTemperature: 0,
        status: 0,
        week: 0,
        Ts: 0,
    });
    const [dataComparator, setDataComparator] = useState({
        bitSoilSensor1: 0,
        bitSoilSensor2: 0,
        percentageSoilSensor1: 0,
        percentageSoilSensor2: 0,
        roomHumidity: 0,
        roomTemperature: 0,
        status: 0,
        week: 0,
    });

    const [twentyTimestamp, settwentyTimestamp] = useState(null);
    const [twentyRoomHumidity, setTwentyRoomHumidity] = useState(null);
    const [twentyRoomTemperature, setTwentyRoomTemperature] = useState(null);
    const [twentyPercentageSoilSensor1, setTwentyPercentageSoilSensor1] = useState(null);
    const [twentyPercentageSoilSensor2, setTwentyPercentageSoilSensor2] = useState(null);

    const theme = useMantineTheme();

    const getDataInterfaceFirebase = () => {
        const dataRTDB = ref(db, 'node/interface/');
        onValue(dataRTDB, (snapshot) => {
            setDataInterface(snapshot.val())
        });
    }
    const getDataComparator = () => {
        const dataRTDB = ref(db, 'node/database/')
        const lastDataRTDB = query(dataRTDB, limitToLast(2))
        onValue(lastDataRTDB, (snapshot) => {
            const data = snapshot.val()
            const dataFirstOfTwo = data[Object.keys(data)[0]]
            setDataComparator(dataFirstOfTwo)
        }
        )

    }
    const convertTimeStamp = () => {
        const date = new Date(dataInterface.Ts);
        const output = `Last update: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} GMT+7`;
        return output;
    }
    // belom di handle
    const getDataForGraph20 = () => {
        const dataRTDB = ref(db, 'node/database/')
        const lastDataRTDBtoTwenty = query(dataRTDB, limitToLast(20))
        onValue(lastDataRTDBtoTwenty, (snapshot) => {
            const data = snapshot.val()
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
            settwentyTimestamp(timestamp)
            setTwentyRoomHumidity(roomHumidity)
            setTwentyRoomTemperature(roomTemperature)
            setTwentyPercentageSoilSensor1(percentageSoilSensor1)
            setTwentyPercentageSoilSensor2(percentageSoilSensor2)
        }
        )
    }
    useEffect(() => {
        getDataInterfaceFirebase();
        getDataComparator();
        getDataForGraph20()
    }, [])
    return (
        <>

            <AppShell
                styles={{
                    main: {
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                fixed
                navbar={<NavbarMinimal />}
                header={<HeaderSearch links={[
                    {
                        "link": "/about",
                        "label": "Features"
                    },
                    {
                        "link": "/pricing",
                        "label": "Pricing"
                    },
                    {
                        "link": "/learn",
                        "label": "Learn"
                    },
                    {
                        "link": "/community",
                        "label": "Community"
                    }
                ]} />}
            >
                <StatsGrid data={[
                    {
                        "title": "Plant 1 Soil Moisture Percentage",
                        "icon": "receipt",
                        "value": `${dataInterface.percentageSoilSensor1}%`,
                        "diff": parseInt(`${dataComparator.percentageSoilSensor1}`) - parseInt(`${dataInterface.percentageSoilSensor1}`),
                    },
                    {
                        "title": "Plant 1 Soil Moisture BitOutput",
                        "icon": "coin",
                        "value": `${dataInterface.bitSoilSensor1}`,
                        "diff": parseInt(`${dataComparator.bitSoilSensor1}`) - parseInt(`${dataInterface.bitSoilSensor1}`),
                    },
                    {
                        "title": "Plant 2 Soil Moisture Percentage",
                        "icon": "discount",
                        "value": `${dataInterface.percentageSoilSensor2}`,
                        "diff": parseInt(`${dataComparator.percentageSoilSensor2}`) - parseInt(`${dataInterface.percentageSoilSensor2}`),
                    },
                    {
                        "title": "Plant 2 Soil Moisture BitOutput",
                        "icon": "user",
                        "value": `${dataInterface.bitSoilSensor2}`,
                        "diff": parseInt(`${dataComparator.bitSoilSensor2}`) - parseInt(`${dataInterface.bitSoilSensor2}`),
                    },
                    {
                        "title": "Greenery Humidity",
                        "icon": "user",
                        "value": `${dataInterface.roomHumidity}`,
                        "diff": parseInt(`${dataComparator.roomHumidity}`) - parseInt(`${dataInterface.roomHumidity}`),
                    },
                    {
                        "title": "Greenery Temperature",
                        "icon": "temperature",
                        "value": `${dataInterface.roomTemperature}`,
                        "diff": parseInt(`${dataComparator.roomTemperature}`) - parseInt(`${dataInterface.roomTemperature}`),
                    },
                    {
                        "title": "Week",
                        "icon": "temperature",
                        "value": `${dataInterface.week}`,
                        "diff": parseInt(`${dataComparator.week}`) - parseInt(`${dataInterface.week}`),
                    },
                    {
                        "title": "Time Last Retrieve",
                        "icon": "temperature",
                        "value": `${convertTimeStamp()}`,
                        "diff": 0,
                    },
                ]} />
                <Grid>
                    <Grid.Col xs={7} >
                        <CardGraph 
                        dataFromDatabase={twentyRoomTemperature}
                        dataTimestamp={twentyTimestamp}
                         />
                    </Grid.Col>
                    <Grid.Col xs={7}>
                        <CardGraph
                        dataFromDatabase={twentyRoomHumidity}
                        dataTimestamp={twentyTimestamp}
                        />
                    </Grid.Col>
                    <Grid.Col xs={7}>
                        <CardGraph
                        dataFromDatabase={twentyPercentageSoilSensor1}
                        dataTimestamp={twentyTimestamp}
                        />
                    </Grid.Col>
                    <Grid.Col xs={7}>
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

export default MainDashboard