import React, { useEffect } from "react";
import { AppShell, Grid, TextInput } from "@mantine/core";
import { NavbarMinimal } from "../components/Navbar";
import { HeaderSearch } from "../components/Header";
import { db } from "../Firebase/Firebase";
import { ref, update, onValue } from "firebase/database";
import { Card, Text, Group, Button } from "@mantine/core";
import { getPrediction } from "../api/apiDatabase";
function writeStatus(status: number) {
  update(ref(db, "node/interface/"), {
    status: status,
  });
}
export default function Settings() {
  const [data, setData]: any = React.useState([]);
  const [stepperTime, setStepperTime] = React.useState(0);
  const [stepRotation, setStepRotation] = React.useState(0);
  const [updateTime, setUpdateTime] = React.useState(0);
  const [minimumLevel, setMinimumLevel] = React.useState(0);
  const [dataPrediction, setDataPrediction] = React.useState({
    statusPrediction: 0,
    percentagePrediction: 0,
    dnnActivation: 0,
  });
  const getDataInterfaceFirebase = () => {
    const dataRTDB = ref(db, "node/interface/");
    onValue(dataRTDB, (snapshot) => {
      setData(snapshot.val());
    });
  };
  let stepToDegree = (data.step * 1.8).toString();

  const handleClickStatus = () => {
    if (data.status === 0) {
      writeStatus(1);
    } else {
      writeStatus(0);
    }
  };
  const handleSubmitPrediction = () => {
    if (data?.dnnActivation === 0) {
      update(ref(db, "node/interface/"), {
        dnnActivation: 1,
      });
    } else {
      update(ref(db, "node/interface/"), {
        dnnActivation: 0,
      });
    }
  };
  const stepperHandleChange = (event: any) => {
    event.preventDefault();
    update(ref(db, "node/interface/"), {
      step: stepRotation / 1.8,
    });
  };
  const timeHandleChange = (e: any) => {
    e.preventDefault();
    update(ref(db, "node/interface/"), {
      stepperTime: stepperTime,
    });
  };
  const updateTimeHandleChange = (e: any) => {
    e.preventDefault();
    update(ref(db, "node/interface/"), {
      updateTime: updateTime,
    });
  };
  const minimumLevelHandleChange = (e: any) => {
    e.preventDefault();
    update(ref(db, "node/interface/"), {
      minimumSoilLevel: minimumLevel,
    });
  };
  useEffect(() => {
    getDataInterfaceFirebase();
    getPrediction().then((res) => {
      setDataPrediction(res);
    });
  }, []);
  //eslint-disable-next-line
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  return (
    <AppShell
      styles={{}}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<NavbarMinimal />}
      header={<HeaderSearch />}
    >
      {isAuthenticated ? (
        <Grid>
          <Grid.Col xs={3}>
            <Card withBorder p="xl" radius="md">
              <Card.Section
                sx={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)`,
                  height: 140,
                }}
              />
              <Text align="center" size="lg" weight={500} mt="sm">
                Water Irrigation System
              </Text>
              <Text align="center">
                Status Right now:
                <Text size="md" color="dimmed">
                  {data.status === 1 ? "Activated" : "Deactivated"}
                </Text>
              </Text>
              <Group mt="md" position="center" spacing={30}></Group>
              <Button
                fullWidth
                radius="md"
                mt="xl"
                size="md"
                color={"dark"}
                onClick={handleClickStatus}
              >
                Activate Irrigation
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col xs={3}>
            <Card withBorder p="xl" radius="md">
              <Card.Section
                sx={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)`,
                  height: 140,
                }}
              />
              <Text align="center" size="lg" weight={500} mt="sm">
                Water Irrigation System using DNN
              </Text>
              <Text align="center">
                Prediction Status Right now:
                <Text size="md" color="dimmed">
                  {Math.round(dataPrediction?.percentagePrediction * 100)}%{" "}
                  <br />
                  {dataPrediction?.statusPrediction === 1
                    ? "Need to Activate Stepper Motor"
                    : "Deactivated"}
                  <br />
                  {data?.dnnActivation === 1
                    ? "DNN Activated"
                    : "DNN Deactivated"}
                </Text>
              </Text>
              <Group mt="md" position="center" spacing={30}></Group>
              <Button
                fullWidth
                radius="md"
                mt="xl"
                size="md"
                color={"dark"}
                onClick={handleSubmitPrediction}
              >
                Turn on DNN
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col xs={3}>
            <Card withBorder p="xl" radius="md">
              <Card.Section
                sx={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)`,
                  height: 140,
                }}
              />
              <Text align="center" size="lg" weight={500} mt="sm">
                Minimum Soil Moisture Level
              </Text>
              <Text align="center" size="sm" color="dimmed">
                Soil Moisture Level: {data.minimumSoilLevel} %RH
              </Text>
              <form onSubmit={minimumLevelHandleChange}>
                <TextInput
                  label={"Time to Update"}
                  placeholder={`${data.minimumSoilLevel} %RH`}
                  onChange={(e: any) => {
                    setMinimumLevel(parseInt(e.target.value));
                  }}
                />
                <Button
                  fullWidth
                  radius="md"
                  mt="xl"
                  size="md"
                  color={"dark"}
                  type="submit"
                >
                  Change minimum level
                </Button>
              </form>
            </Card>
          </Grid.Col>
          <Grid.Col xs={3}>
            <Card withBorder p="xl" radius="md">
              <Card.Section
                sx={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1583198432859-635beb4e8600?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60)`,
                  height: 140,
                }}
              />
              <Text align="center" size="lg" weight={500} mt="sm">
                Stepper motor Opening and Closing
              </Text>
              <form onSubmit={stepperHandleChange}>
                <Text align="center" size="sm" color="dimmed">
                  Degree of opening: {data.step * 1.8}
                </Text>
                <TextInput
                  label="Degree"
                  placeholder={stepToDegree}
                  onChange={(e: any) =>
                    setStepRotation(parseInt(e.target.value))
                  }
                />

                <Button
                  fullWidth
                  radius="md"
                  mt="xl"
                  size="md"
                  color={"dark"}
                  type="submit"
                >
                  Change Degree
                </Button>
              </form>
            </Card>
          </Grid.Col>
          <Grid.Col xs={3}>
            <Card withBorder p="xl" radius="md">
              <Card.Section
                sx={{
                  backgroundImage: `url(https://images.unsplash.com/37/tEREUy1vSfuSu8LzTop3_IMG_2538.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)`,
                  height: 140,
                }}
              />
              <Text align="center" size="lg" weight={500} mt="sm">
                Time Stepper Motor Opening
              </Text>
              <Text align="center" size="sm" color="dimmed">
                Time opened: {data.stepperTime} seconds
              </Text>
              <form onSubmit={timeHandleChange}>
                <TextInput
                  label={"Time"}
                  placeholder={data.stepperTime}
                  onChange={(e: any) => {
                    setStepperTime(parseInt(e.target.value));
                  }}
                />
                <Button
                  fullWidth
                  radius="md"
                  mt="xl"
                  size="md"
                  color={"dark"}
                  type="submit"
                >
                  Change Time Stepper
                </Button>
              </form>
            </Card>
          </Grid.Col>
          <Grid.Col xs={3}>
            <Card withBorder p="xl" radius="md">
              <Card.Section
                sx={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1480944657103-7fed22359e1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHVwZGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60)`,
                  height: 140,
                }}
              />
              <Text align="center" size="lg" weight={500} mt="sm">
                Update Data Time
              </Text>
              <Text align="center" size="sm" color="dimmed">
                Time to update data: {data.updateTime} minutes
              </Text>
              <form onSubmit={updateTimeHandleChange}>
                <TextInput
                  label={"Time to Update"}
                  placeholder={data.updateTime}
                  onChange={(e: any) => {
                    setUpdateTime(parseInt(e.target.value));
                  }}
                />
                <Button
                  fullWidth
                  radius="md"
                  mt="xl"
                  size="md"
                  color={"dark"}
                  type="submit"
                >
                  Change time to Update
                </Button>
              </form>
            </Card>
          </Grid.Col>
        </Grid>
      ) : (
        <div>You are not authenticated</div>
      )}
    </AppShell>
  );
}
