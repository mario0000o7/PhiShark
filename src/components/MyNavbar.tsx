import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import Image from "next/image";
export default function MyNavbar({title}:any) {
    return (
            <Navbar isBordered variant="sticky" maxWidth={'fluid'}>
                <Navbar.Brand>
                    <Image src={'/phisharklogo.png'} alt={'Logo'} width={70} height={70}/>

                </Navbar.Brand>


                <Navbar.Content  >

                        <Text  size={50} style={{textAlign: 'center'}}>
                            {title}
                        </Text>
                </Navbar.Content>
            </Navbar>
    )
}
