import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MyNavbar from "@/components/MyNavbar";
import React, {useState, useRef, useEffect} from "react";
import {Table, Button, Textarea,Input,Text} from '@nextui-org/react';
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
        const [campaignName,setCampaignName] = useState("");

        function sendCampaign() {
            if(campaignName==''){
                alert("Podaj nazwę kampanii");
                return;
            }
            const selectedMails = mails.filter((mail, index) => selectedRows.has(index.toString()));
            console.log('You clicked submit.');
            fetch('/api/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({mailContent, mail, selectedMails, range, attachments, url, campaignName}),
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
        const allIndices = Array.from({ length: totalRows }, (_, i) => i); // Utwórz tablicę indeksów od 0 do totalRows - 1

        for (let i = totalRows - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
        }

        const selectedIndices = allIndices.slice(0, selectedRowCount); // Wybierz pierwsze selectedRowCount indeksów

        const randomRows = selectedIndices.map(index => index.toString());
        setSelectedRows(randomRows);
    };

    const handleSliderChange = (event) => {
        console.log(event.target.value+"%");
        const value = parseInt(event.target.value);
        setRange(value);
        selectRandomRows();
        console.log(selectedRows);
    };

    const fileInputRef = useRef(null);
    const handleSelectFileClick = () => {
      fileInputRef.current.click();
    };

    const handleSelectFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const contents = e.target.result;
          const lines = contents.split('\n');
          const emails = lines.map((line) => line.trim()).filter((line) => line.includes('@'));
          setMails(emails);
          console.log('Załadowane maile:', emails);
        };
        reader.readAsText(file);
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

                            <Input  bordered={true}
                                    placeholder={'Wpisz adres email do podszycia'}

                                    css={{width: "100%",background:'#3B3B3B'}} onChange={event => setMail(event.target.value)}/>
                        </form>
                        <header style={{marginBottom:'5px'}} className={styles.header} >Adresy email:</header>
                        <Table
                            style={{margin:'0px',padding:'0px',borderRadius:'20px',marginBottom:'0px'}}
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
                        <Input
                            bordered={true}
                            placeholder={'Wpisz adres email'}

                            css={{width: "100%",marginBottom:'10px',background:'#3B3B3B'}} ref={inputRef}/>
                        <Button color="gradient" css={{width:'100%'}} className={styles.button} onClick={() => {
                            if(inputRef.current.value === "") return;
                            if(inputRef.current.value.includes("@") === false) return;
                            setMails([...mails, inputRef.current.value])
                            inputRef.current.value = "";
                        }}>Dodaj adresy mail
                        </Button>

                        <input type="file" accept=".csv" style={{ display: 'none' }} ref={fileInputRef} onChange={handleSelectFile} />
                        <Button color="gradient" css={{width:'100%'}} className={styles.button} onPress={handleSelectFileClick}>Załaduj adresy email z pliku</Button>
                        <h3 className={styles.header}>Przedział wysłania mailów</h3>
                        <input style={{width: "100%"}} type="range" min="0" max="100" value={range}
                               onChange={handleSliderChange}/>
                    </div>
                    <div style={{width:'100%'}}>
                        <form>
                            <header style={{marginTop:'0'}} className={styles.header}>Nazwa kampanii:</header>
                            <Input bordered={true}
                                       placeholder={'Wpisz link url'}

                                       css={{width: "100%",background:'#3B3B3B'}}  onChange={event => setCampaignName(event.target.value)}/>
                        </form>
                        <form>
                            <header style={{marginTop:'0'}} className={styles.header}>Treść maila:</header>
                            <textarea value={mailContent} style={{width: "100%"}} rows="28"
                                      onChange={event => setMailContent(event.target.value)}></textarea>
                        </form>
                        <Button color="gradient" css={{width:'100%'}} className={styles.button} onClick={sendCampaign}>Wyślij</Button>
                    </div>
                    <div style={{width:'100%'}}>
                        <form>
                            <header style={{marginTop:'0'}} className={styles.header}>Link Url:</header>
                            <Input bordered={true}
                                       placeholder={'Wpisz link url'}

                                       css={{width: "100%",background:'#3B3B3B'}}  onChange={event => setUrl(event.target.value)}/>
                        </form>
                        <form onSubmit={generateAiResponse}>
                            <header className={styles.header}>Zapytanie do AI:</header>
                            <textarea style={{width: "100%",borderRadius:'20px'} } onChange={event => setAiRequest(event.target.value)} rows="20"></textarea>
                            <Button color="gradient" css={{width:'100%'}} className={styles.button} type="submit">Generuj</Button>

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
