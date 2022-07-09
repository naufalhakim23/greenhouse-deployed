import React from "react";
import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Burger,
  Image,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { Search } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

export function HeaderSearch() {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();

  // if burger is clicked toggle the opened state and render navbar
  // const navbar = opened ? <NavbarMinimal /> : toggleOpened(false);
  return (
    <Header height={60} className={classes.header} mb={50}>
      <div className={classes.inner}>
        <Group align="center">
          <Burger
            opened={opened}
            onClick={() => {
              toggleOpened();
            }}
            size="sm"
          />
          <Image
            src="./garden-deployed.png"
            alt="garden-deployed"
            width={130}
          />
        </Group>
        <Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<Search size={16} />}
            data={["React", "Angular", "Vue", "Next.js", "Svelte", "Blitz.js"]}
          />
        </Group>
      </div>
    </Header>
  );
}
