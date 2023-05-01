import {Popover, Table, Text, useAsyncList} from '@nextui-org/react';
import React from 'react';

import pool from './mariadbPool';

interface MyTableProps {
    id: number;
    id_kampanii: number;
    email: string;
    zalacznik: number;
    url: number;
    skradzione_dane: number;

}
export default function MyTable(){
    async function load({ signal, cursor }:any) {
        // If no cursor is available, then we're loading the first page.
        // Otherwise, the cursor is the next URL to load, as returned from the previous page.
        const res = await fetch(
            cursor || "http://localhost:3000/api/campaignDetails/1",
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
            aria-label="Example static collection table with multiple selection"
            shadow={false}
            lined
            headerLined

            css={{
                width: "100%",
                height: "100%",
                padding:"0px",
                margin:"0px",
                background:'white',

            }}
            selectionMode="multiple"
        >
            <Table.Header >
                <Table.Column css={{color:'black',textAlign:'start',width:'40%'}}>Email</Table.Column>
                <Table.Column css={{color:'black',textAlign:'center',width:'40%'}}>Status</Table.Column>
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