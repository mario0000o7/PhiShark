import { Table } from '@nextui-org/react';


const columns = [
    {
        key: "email",
        label: "Adres Email",
    },
    {
        key: "status",
        label: "Status",
    },
];
const rows = [
    {
        key: "1",
        email: "mail1@test.com",
        status: "Odrzucony mail",
    },{
        key: "2",
        email: "mail2@test.com",
        status: "Odrzucony mail",
    },{
        key: "3",
        email: "mail3@test.com",
        status: "Odrzucony mail",
    },{
        key: "4",
        email: "mail4@test.com",
        status: "Odrzucony mail",
    },

];


export default function MailTable(){
    return(
        <Table
            aria-label="Example static collection table with multiple selection"
            css={{
                width: "100%",
                height: "100%",
                padding:"0px",
                margin:"0px",
            }}
            selectionMode="multiple"
        >
            <Table.Header>
                <Table.Column>NAME</Table.Column>
            </Table.Header>
            <Table.Body>
                <Table.Row key="1">
                    <Table.Cell>Tony Reichert</Table.Cell>
                </Table.Row>
                <Table.Row key="2">
                    <Table.Cell>Zoey Lang</Table.Cell>
                </Table.Row>
                <Table.Row key="3">
                    <Table.Cell>Jane Fisher</Table.Cell>
                </Table.Row>
                <Table.Row key="4">
                    <Table.Cell>William Howard</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );

}