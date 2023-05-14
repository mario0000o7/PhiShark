import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MyNavbar from "@/components/MyNavbar";
import React, {useState, useRef} from "react";
import { Table } from '@nextui-org/react';
const { Configuration, OpenAIApi } = require("openai");
import {SSRProvider} from 'react-aria';

export default function Home() {

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);
        const [mailContent, setMailContent] = useState("");
        const [mail, setMail] = useState("");
        const [range, setRange] = useState("");
        const [mails, setMails] = useState([]);
        const [url, setUrl] = useState("");
        const [aiRequest, setAiRequest] = useState("");
        const [attachments, setAttachments] = useState("");
        const inputRef = useRef(null);

        function sendCampaign(e) {
            e.preventDefault();
            console.log('You clicked submit.');
            fetch('http://localhost:3000/api/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({mailContent, mail, mails, range, attachments}),
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
                    <div>
                        <form>
                            <header className={styles.header}>Adres email do podszycia:</header>

                            <input style={{width: "100%"}} onChange={event => setMail(event.target.value)}/>
                        </form>
                        <header className={styles.header}>Adresy email:</header>
                        <Table aria-label="Example static collection table with multiple selection"
                               css={{
                                   width: "100%",
                                   height: "100%",
                                   padding: "0px",
                                   margin: "0px",
                               }}
                               selectionMode="multiple"
                        >
                            <Table.Header>
                                <Table.Column>NAME</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {mails?.map((mail, i) => (
                                    <Table.Row key={i}>
                                        <Table.Cell>{mail}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        <input style={{width: "100%"}} ref={inputRef}/>
                        <button className={styles.button} onClick={() => {
                            setMails([...mails, inputRef.current.value])
                            inputRef.current.value = "";
                        }}>Dodaj adresy mail
                        </button>

                        <button className={styles.button}>Załaduj adresy mail</button>
                        <h3 className={styles.header}>Przedział wysłania mailów</h3>
                        <input style={{width: "100%"}} type="range" min="0" max="100"/>
                    </div>
                    <div>
                        <form>
                            <header className={styles.header}>Treść maila:</header>
                            <textarea value={mailContent} style={{width: "100%"}} rows="30"
                                      onChange={event => setMailContent(event.target.value)}></textarea>
                        </form>
                        <button className={styles.button} onClick={sendCampaign}>Wyślij</button>
                    </div>
                    <div>
                        <form>
                            <header className={styles.header}>Link Url:</header>
                            <input style={{width: "100%"}} onChange={event => setUrl(event.target.value)}/>
                        </form>
                        <form onSubmit={generateAiResponse}>
                            <header className={styles.header}>Zapytanie do AI:</header>
                            <textarea style={{width: "100%"} } onChange={event => setAiRequest(event.target.value)} rows="20"></textarea>
                            <button className={styles.button} type="submit">Generuj</button>

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
