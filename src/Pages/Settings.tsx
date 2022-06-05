import React from "react";
import { AppShell, Grid } from "@mantine/core";
import { NavbarMinimal } from "../components/Navbar";
import { HeaderSearch } from "../components/Header";
import CardInput from "../components/Card";
import { db } from "../Firebase/Firebase";
import { ref, update } from "firebase/database";
function writeStatus(status: number) {
  update(ref(db, "node/interface/"), {
    status: status,
  });
}
export default function Settings() {
  const handleClickStatus = () => {
    writeStatus(1);
  };
  return (
    <AppShell
      styles={{}}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<NavbarMinimal />}
      header={<HeaderSearch />}
    >
      <Grid>
        <Grid.Col xs={3}>
          <CardInput
            image={
              "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            }
            name={"Irrigation System"}
            stats={[
              {
                value: "34K",
                label: "Followers",
              },
              {
                value: "187",
                label: "Follows",
              },
              {
                value: "1.6K",
                label: "Posts",
              },
            ]}
            onclickStatus={() => {
              handleClickStatus();
            }}
          />
        </Grid.Col>
        <Grid.Col xs={3}>
          <CardInput
            image={
              "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            }
            name={"Stepper Motor Degree Opening"}
            stats={[
              {
                value: "34K",
                label: "Followers",
              },
              {
                value: "187",
                label: "Follows",
              },
              {
                value: "1.6K",
                label: "Posts",
              },
            ]}
            onclickStatus={() => {
              handleClickStatus();
            }}
          />
          </Grid.Col>
          <Grid.Col xs={3}>
          <CardInput
            image={
              "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            }
            name={"Time Stepper Motor Opening"}
            stats={[
              {
                value: "34K",
                label: "Followers",
              },
              {
                value: "187",
                label: "Follows",
              },
              {
                value: "1.6K",
                label: "Posts",
              },
            ]}
            onclickStatus={() => {
              handleClickStatus();
            }}
          />
          </Grid.Col>
      </Grid>
    </AppShell>
  );
}
