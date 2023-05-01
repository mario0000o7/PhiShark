import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Layout } from "./Layout.js";

export default function MyNavbar() {
    return (
            <Navbar isBordered variant="floating">

                <Navbar.Content hideIn="xs" variant="highlight-rounded">
                    <Navbar.Link href="#">Features</Navbar.Link>
                    <Navbar.Link isActive href="#">Customers</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Company</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="#">
                        Login
                    </Navbar.Link>
                    <Navbar.Item>
                        <Button auto flat as={Link} href="#">
                            Sign Up
                        </Button>
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
    )
}
