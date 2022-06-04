import { useState, useEffect } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { HeaderSearch } from "../components/Header";
import { NavbarMinimal } from "../components/Navbar";
import { StatsGrid } from "../components/Status";
// interaction with the API
import { db } from "../Firebase/Firebase";
import { ref, onValue, limitToLast, query } from "firebase/database";

function MainDashboard() {
    const [dataInterface, setDataInterface] = useState({
        percentageSoilSensor1: 0,
        percentageSoilSensor2: 0,
        roomHumidity: 0,
        roomTemperature: 0,
        status: 0,
        week: 0,
        Ts: 0,
    });
    const [dataComparator, setDataComparator] = useState({
        percentageSoilSensor1: 0,
        percentageSoilSensor2: 0,
        roomHumidity: 0,
        roomTemperature: 0,
        status: 0,
        week: 0,
    });


    const theme = useMantineTheme();

    const getDataInterfaceFirebase = () => {
        const dataRTDB = ref(db, "node/interface/");
        onValue(dataRTDB, (snapshot) => {
            setDataInterface(snapshot.val());
        });
    };
    const getDataComparator = () => {
        const dataRTDB = ref(db, "node/database/");
        const lastDataRTDB = query(dataRTDB, limitToLast(2));
        onValue(lastDataRTDB, (snapshot) => {
            const data = snapshot.val();
            const dataFirstOfTwo = data[Object.keys(data)[0]];
            setDataComparator(dataFirstOfTwo);
        });
    };
    const convertTimeStamp = () => {
        const date = new Date(dataInterface.Ts);
        const output = `Last update: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getMonth() + 1
            }/${date.getFullYear()} GMT+7`;
        return output;
    };
    useEffect(() => {
        getDataInterfaceFirebase();
        getDataComparator();
    }, []);
    return (
        <>
            <AppShell
                styles={{
                    main: {
                        background:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                    },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                fixed
                navbar={<NavbarMinimal />}
                header={<HeaderSearch />}
            >
                <StatsGrid
                    data={[
                        {
                            title: "Plant 1 Soil Moisture Percentage",
                            icon: "receipt",
                            value: `${dataInterface.percentageSoilSensor1}%`,
                            diff:
                                parseInt(`${dataInterface.percentageSoilSensor1}`) -
                                parseInt(`${dataComparator.percentageSoilSensor1}`)
                        },
                        {
                            title: "Plant 2 Soil Moisture Percentage",
                            icon: "discount",
                            value: `${dataInterface.percentageSoilSensor2}`,
                            diff:
                                parseInt(`${dataInterface.percentageSoilSensor2}`) -
                                parseInt(`${dataComparator.percentageSoilSensor2}`)
                        },
                        {
                            title: "Greenery Humidity",
                            icon: "user",
                            value: `${dataInterface.roomHumidity}`,
                            diff:
                                parseInt(`${dataInterface.roomHumidity}`) -
                                parseInt(`${dataComparator.roomHumidity}`)
                        },
                        {
                            title: "Greenery Temperature",
                            icon: "temperature",
                            value: `${dataInterface.roomTemperature}`,
                            diff:
                                parseInt(`${dataInterface.roomTemperature}`) -
                                parseInt(`${dataComparator.roomTemperature}`)
                        },
                        {
                            title: "Week",
                            icon: "temperature",
                            value: `${dataInterface.week}`,
                            diff:
                                parseInt(`${dataInterface.week}`) -
                                parseInt(`${dataComparator.week}`)
                        },
                        {
                            title: "Time Last Retrieve",
                            icon: "temperature",
                            value: `${convertTimeStamp()}`,
                            diff: 0,
                        },
                    ]}
                />
            </AppShell>
        </>
    );
}

export default MainDashboard;
