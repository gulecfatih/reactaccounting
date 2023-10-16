import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme,
    Button
} from '@mantine/core';
import { useRouter } from 'next/router';
import CrudExpense from '../Lists/CrudExpense';
import ListExpense from '../Lists/ListExpense';



export default function Home() {

    const router = useRouter()
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [tab, setTab] = useState("crudExpenses");
    const LogOuth = () => {
        localStorage.setItem('role', "");
        localStorage.setItem('userId', "");
        localStorage.setItem('token', "");
        router.push("/")
    }
    const CrudExpenses = () => {
        setTab("crudExpenses")
    }
    const ListExpenses = () => {

        setTab("listExpenses")
    }

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>

                    <Button style={{ display: "flex", justifyContent: "start" }} onClick={() => { CrudExpenses() }} variant="white">
                        Add Expenses
                    </Button>
                    <Button style={{ display: "flex", justifyContent: "start" }} onClick={() => { ListExpenses() }} variant="white">
                        List Expenses
                    </Button>
                </Navbar>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'end', height: '100%', justifyContent: "end" }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <Button m="5px" onClick={() => { LogOuth() }} >Sign Out</Button>
                    </div>
                </Header>
            }
        >

            {tab === "crudExpenses" ? (<CrudExpense/>) : tab === "listExpenses" ? (<ListExpense/>) : ""}

        </AppShell>
    );
}