import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import Image from "next/image";
import React from "react";
export default function MyNavbar({title}:any) {
    return (
            <Navbar  isBordered variant="static" maxWidth={'fluid'} css={{background:'#161C2E'}}>
                <Navbar.Brand>
                    <Image src={'/phisharklogo.png'} alt={'Logo'} width={70} height={70}/>
                </Navbar.Brand>

                <Navbar.Content>
                    <Navbar.Item>
                        <Link href="/newCampaign"><Button color="gradient" auto>Stwórz nową kampanię</Button></Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Link href="/CampaignDashboard"><Button color="gradient" auto>Lista kampanii</Button></Link>
                    </Navbar.Item>
                    <Text  size={50} style={{textAlign: 'center'}}>
                        {title}
                    </Text>
                </Navbar.Content>
            </Navbar>
    )
}
