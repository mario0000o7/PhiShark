import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MyNavbar from "@/components/MyNavbar";
import React, {useState, useRef, useEffect} from "react";
import {Table, Button, Input, useAsyncList} from '@nextui-org/react';
const { Configuration, OpenAIApi } = require("openai");
import {SSRProvider} from 'react-aria';
import {func} from "prop-types";

export default function Home() {

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);
        const [mailContent, setMailContent] = useState("");
        const [mail, setMail] = useState("");
        const [range, setRange] = useState(100);
        const [mails, setMails] = useState([]);
        const [url, setUrl] = useState("");
        const [aiRequest, setAiRequest] = useState("");
        const [attachments, setAttachments] = useState("");
        const inputRef = useRef(null);
        const [selectedRows, setSelectedRows] = useState([]);






        function sendCampaign(e) {
            e.preventDefault();
            console.log('You clicked submit.');
            fetch('http://localhost:3000/api/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({mailContent, mail, mails, range, attachments, url}),
            })
        }

    async function generateAiResponse(event) {
        event.preventDefault();
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: aiRequest }),
        });
        const data = await response.json();
        setMailContent(data.result);
    }

    const selectRandomRows = () => {
        const totalRows = mails.length;
        const selectedRowCount = Math.round((range / 100) * totalRows);
        const randomRows = [];

        while (randomRows.length < selectedRowCount) {
            const randomIndex = Math.floor(Math.random() * totalRows);
            if (!randomRows.includes(randomIndex)) {
                randomRows.push(randomIndex.toString());
            }
        }
        setSelectedRows(randomRows);
    };

    const handleSliderChange = (event) => {
        console.log(event.target.value+"%");
        const value = parseInt(event.target.value);
        setRange(value);
        selectRandomRows();
        console.log(selectedRows);
    };

    return (
            <SSRProvider>
            <>
                <Head>
                    <title>Create Next App</title>
                    <meta name="description" content="Generated by create next app"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <MyNavbar/>
                <div className={styles.container}>
                    <div style={{width:'100%'}}>
                        <form>
                            <header style={{marginTop:'0'}} className={styles.header}>Adres email do podszycia:</header>

                            <input style={{width: "100%",marginBottom:'0px'}} onChange={event => setMail(event.target.value)}/>
                        </form>
                        <header style={{marginBottom:'5px'}} className={styles.header} >Adresy email:</header>
                        <Table
                            style={{margin:'0px',padding:'0px',borderRadius:'20px',marginBottom:'10px'}}
                               aria-label="Example static collection table with multiple selection"
                               shadow={false}
                               lined
                               headerLined
                                // onLoadMore={mails.length}
                               css={{
                                   width: "100%",
                                   height: "calc($space$14 * 14)",
                                   // maxHeight: "calc($space$14 * 10)",
                                   padding: "0px",
                                   margin: "0px",
                                   background:'#3B4256',
                               }}
                            containerCss={{
                                width: "100%",
                                maxHeight: "calc($space$14 * 14)",
                            }}


                               selectionMode="multiple"
                               selectedKeys={selectedRows}
                               onSelectionChange={setSelectedRows}
                        >
                            <Table.Header>
                                <Table.Column css={{color:'white',textAlign:'center',width:'100%'}}>Adres Email</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {mails?.map((mail, i) => (
                                    <Table.Row key={i}>
                                        <Table.Cell css={{textAlign:'center',width:'100%'}}>{mail}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                            <Table.Pagination
                                shadow
                                noMargin
                                align="center"
                                rowsPerPage={10}
                            />
                        </Table>
                        <input style={{width: "100%",marginBottom:'10px'}} ref={inputRef}/>
                        <Button css={{width:'100%'}} className={styles.button} onClick={() => {
                            setMails([...mails, inputRef.current.value])
                            inputRef.current.value = "";
                        }}>Dodaj adresy mail
                        </Button>

                        <Button css={{width:'100%'}} className={styles.button}>Załaduj adresy mail</Button>
                        <h3 className={styles.header}>Przedział wysłania mailów</h3>
                        <input style={{width: "100%"}} type="range" min="0" max="100" value={range}
                               onChange={handleSliderChange}/>
                    </div>
                    <div style={{width:'100%'}}>
                        <form>
                            <header style={{marginTop:'0'}} className={styles.header}>Treść maila:</header>
                            <textarea value={mailContent} style={{width: "100%"}} rows="30"
                                      onChange={event => setMailContent(event.target.value)}></textarea>
                        </form>
                        <Button css={{width:'100%'}} className={styles.button} onClick={sendCampaign}>Wyślij</Button>
                    </div>
                    <div style={{width:'100%'}}>
                        <form>
                            <header style={{marginTop:'0'}} className={styles.header}>Link Url:</header>
                            <input style={{width: "100%"}} onChange={event => setUrl(event.target.value)}/>
                        </form>
                        <form onSubmit={generateAiResponse}>
                            <header className={styles.header}>Zapytanie do AI:</header>
                            <textarea style={{width: "100%"} } onChange={event => setAiRequest(event.target.value)} rows="20"></textarea>
                            <Button css={{width:'100%'}} className={styles.button} type="submit">Generuj</Button>

                        </form>
                        <form>
                            <header className={styles.header}>Załączniki:</header>
                            <input type="file" onChange={event => setAttachments(event.target.value)}></input>
                        </form>
                    </div>

                </div>
            </>
                </SSRProvider>
        );
}
