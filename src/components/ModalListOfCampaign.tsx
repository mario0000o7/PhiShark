import {useEffect,useState} from "react";
import {Modal, useModal, Button, Text, Table, useAsyncList} from "@nextui-org/react";
import {IconButton} from "@/components/IconButton";
import {EyeIcon} from "@/components/EyeIcon";


export default function ModalListOfCampaign({bindings,setVisible,setCampaignId,setNameofCampaign}:any) {
    async function load({ signal, cursor }:any) {
        // If no cursor is available, then we're loading the first page.
        // Otherwise, the cursor is the next URL to load, as returned from the previous page.
        const res = await fetch(
            cursor || ("http://localhost:3000/api/getCampaignListWithCountsOfMails"),
            { signal }
        );
        const json = await res.json();
        console.log(json);
        console.log(json);
        return {
            items: json,
            cursor: json.next,
        };
    }
    const list = useAsyncList({ load });
    function changeCampaignId(id:number, name:string){
        console.log(id)
        setCampaignId(id)
        setVisible(false)
        setNameofCampaign(name)
    }







    return (
        <Modal width="50%"
            {...bindings}>
            <Modal.Header>

                <Text>Lista Kampanii</Text>
            </Modal.Header>
            <Modal.Body>
                <Table

                >
                    <Table.Header>
                        <Table.Column>Nazwa Kampanii</Table.Column>
                        <Table.Column>Wysłane</Table.Column>
                        <Table.Column>Szczegóły</Table.Column>
                    </Table.Header>
                    <Table.Body
                        items={list.items}
                        loadingState={list.loadingState}
                        onLoadMore={list.loadMore}
                    >
                        {(item) => (
                            // @ts-ignore
                            <Table.Row key={item.nazwa_kampanii}>
                                {/*// @ts-ignore*/}
                                <Table.Cell>{item['nazwa_kampanii']}</Table.Cell>
                                {/*// @ts-ignore*/}
                                <Table.Cell>{item['ilosc_mailii']}</Table.Cell>
                                {/*// @ts-ignore*/}
                                <Table.Cell> <IconButton onClick={()=>changeCampaignId(item['id'],item['nazwa_kampanii'])}><EyeIcon size={20} fill="#979797" /></IconButton></Table.Cell>

                            </Table.Row>
                        )}

                    </Table.Body>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={() => setVisible(false)}>
                    Zamknij
                </Button>

            </Modal.Footer>
        </Modal>









    )
}
