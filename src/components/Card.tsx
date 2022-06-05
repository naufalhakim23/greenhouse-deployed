import React from 'react';
import { createStyles, Card, Text, Group, Button } from '@mantine/core';
const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
  
    avatar: {
      border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
  }));
interface UserCardImageProps {
    image: string;
    name: string;
    stats: { label: string; value: string }[];
    onclickStatus: any;
  }

export default function CardInput(
    { image, name, stats, onclickStatus }: UserCardImageProps, 
) {
    const { classes, theme } = useStyles();
    const items = stats.map((stat) => (
        <div key={stat.label}>
          <Text align="center" size="lg" weight={500}>
            {stat.value}
          </Text>
          <Text align="center" size="sm" color="dimmed">
            {stat.label}
          </Text>
        </div>
      ));
    return (
        
            <Card withBorder p="xl" radius="md" className={classes.card}>
                <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
                <Text align="center" size="lg" weight={500} mt="sm">
                    {name}
                </Text>
                <Group mt="md" position="center" spacing={30}>
                    {items}
                </Group>
                <Button
                    fullWidth
                    radius="md"
                    mt="xl"
                    size="md"
                    color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                    onClick={ onclickStatus}
                >
                    Activate Irrigation
                </Button>
            </Card>
    );
}

