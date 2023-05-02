import {Popover, Table, Text, useAsyncList} from '@nextui-org/react';
import Papa from 'papaparse';
import React, {useEffect, useState} from 'react';
function convertToCSV(data:any){
    console.log(data);
    return Papa.unparse(data);
}

function CSVDownloadLink({ data, filename }:any) {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
}

interface MyTableProps {
    id: number;
    id_kampanii: number;
    email: string;
    zalacznik: number;
    url: number;
    skradzione_dane: number;

}
export default function MyTable({campaignId,generateCSV}:any){
    const [selectedItems, setSelectedItems] = useState({anchorKey:0,currentKey:0,size:0});
    function handleSelectedItems(keys: any) {
        setSelectedItems(keys);
    }
    useEffect(() => {
        if(selectedItems.size==0)
            return;
        let selectedItemsArray:any=[];
        // @ts-ignore
        if(selectedItems!='all')
            (selectedItems as any).forEach((value:any, key:any) => {
                selectedItemsArray.push(parseInt(key));
            });
        fetch(('http://localhost:3000/api/campaignDetails/'+campaignId))
            .then(response => response.json())
            .then(data => {
                let csvData:any=[];
                for(let i=0;i<data.length;i++){
                    // @ts-ignore
                    if(selectedItemsArray.includes(data[i].id)||selectedItems=='all'){
                        csvData.push(data[i]);
                    }
                }
                window.open(CSVDownloadLink({data:csvData,filename:'test.csv'}));

            }).catch((error) => {
            console.error('Error:', error);
        });
    },[generateCSV]);


    async function load({ signal, cursor }:any) {
        // If no cursor is available, then we're loading the first page.
        // Otherwise, the cursor is the next URL to load, as returned from the previous page.
        const res = await fetch(
            cursor || ("http://localhost:3000/api/campaignDetails/"+campaignId),
            { signal }
        );
        const json = await res.json();
        console.log(json);
        return {
            items: json,
            cursor: json.next,
        };
    }
    const list = useAsyncList<MyTableProps>({ load });
    return(
        <Table
            aria-label="Table with targets"
            shadow={false}
            lined
            headerLined
            selectionMode="multiple"
            onSelectionChange={handleSelectedItems}
            id={'table'}



            css={{
                width: "100%",
                height: "100%",
                padding:"0px",
                margin:"0px",
                background:'#3B4256',

            }}
            containerCss={{
                width: "100%",
                height: "100%",
            }}
        >
            <Table.Header >
                <Table.Column css={{color:'white',textAlign:'start',width:'40%'}}>Email</Table.Column>
                <Table.Column css={{color:'white',textAlign:'center',width:'40%'}}>Status</Table.Column>
            </Table.Header>
            <Table.Body
                items={list.items}
                loadingState={list.loadingState}
                onLoadMore={list.loadMore}
            >
                {(item) => (
                    <Table.Row key={item['id']}>
                        <Table.Cell css={{textAlign:'start',width:'40%'}}>
                            <Popover>
                                <Popover.Trigger>
                                    {item['email']}
                                </Popover.Trigger>
                                <Popover.Content >
                                    <Text css={{ p: "$xs" }}>{item['email']}</Text>
                                </Popover.Content>
                            </Popover>
                        </Table.Cell>
                        {item['skradzione_dane'] === 1 ? (
                                <Table.Cell css={{background:'red',textAlign:'center',width:'40%'}}>
                                    <Popover>
                                        <Popover.Trigger>
                                            Skradzione dane
                                        </Popover.Trigger>
                                        <Popover.Content >
                                            <Text css={{ p: "$xs" }}>Skradzione dane</Text>
                                        </Popover.Content>
                                    </Popover>
                                </Table.Cell>
                        ) : item['url'] === 1 ? (

                                <Table.Cell css={{background:'#F3BB2C',textAlign:'center',width:'40%'}}>
                                    <Popover>
                                        <Popover.Trigger>
                                            Otwarcie linku
                                        </Popover.Trigger>
                                        <Popover.Content >
                                            <Text css={{ p: "$xs" }}>Otwarcie linku</Text>
                                        </Popover.Content>
                                    </Popover>
                                </Table.Cell>
                        ) : item['zalacznik'] === 1 ? (

                                <Table.Cell css={{background:'#E8AA5E',textAlign:'center',width:'40%'}}>
                                    <Popover>
                                        <Popover.Trigger>
                                            Otwarcie załącznika
                                        </Popover.Trigger>
                                        <Popover.Content >
                                            <Text css={{ p: "$xs" }}>Otwarcie załącznika</Text>
                                        </Popover.Content>
                                    </Popover>

                                </Table.Cell>
                        ) : (

                                <Table.Cell css={{background:'green',textAlign:'center',width:'40%'}}>
                                    <Popover>
                                        <Popover.Trigger>
                                            Nie otworzono
                                        </Popover.Trigger>
                                        <Popover.Content >
                                            <Text css={{ p: "$xs" }}>Nie otworzono</Text>
                                        </Popover.Content>
                                    </Popover>

                                </Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );

}