import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MyNavbar from "@/components/MyNavbar";
import {useState} from "react";
import MailTable from "@/components/MailTable";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [mailContent, setMailContent] = useState("");
    const [mail, setMail] = useState("");
    const [range, setRange] = useState("");
    const [url, setUrl] = useState("");
    const [aiRequest, setAiRequest] = useState("");
    const [attachments, setAttachments] = useState("");
    function sendCampaign(e) {
        e.preventDefault();
        console.log('You clicked submit.');
    }
    function generateAiResponse(e) {
        setMailContent("Szanowni Państwo,\n" +
            "Wysłałem w ostatnim czasie raport na Państwa adres e-mail i chciałbym upewnić się, że został on dostarczony i czy został już sprawdzony.\n" +
            "Czy moglibyście potwierdzić, że otrzymaliście raport i że został on zatwierdzony lub przesłać mi informacje na temat jego bieżącego statusu? Czy wymaga on jakichś zmian lub poprawek?\n" +
            "Oto link do raportu "+url+".\n" +
            "Będę wdzięczny za szybką odpowiedź i potwierdzenie otrzymania raportu.\n" +
            "Z poważaniem, Jan i Kowalski");
        e.preventDefault();

    }
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MyNavbar />
            <div className={styles.container}>
                <div>
                <form>
                    <header  className={styles.header}>Adres email do podszycia:</header>

                    <input style={{width:"100%"}} onChange={event => setMail(event.target.value)}/>
                </form>
                        <header className={styles.header}>Adresy email:</header>
                        <MailTable/>

                <button className={styles.button}>Dodaj adresy mail</button>
                <button className={styles.button}>Załaduj adresy mail</button>
                <h3 className={styles.header}>Przedział wysłania mailów</h3>
                    <input className={styles.slider} type="range" min="0" max="100" />
                </div>
                <div>
                    <form>
                        <header className={styles.header}>Treść maila:</header>
                        <textarea value={mailContent} style={{width:"100%"}} rows="30" onChange={event => setMailContent(event.target.value)}></textarea>
                    </form>
                    <button className={styles.button} onClick={sendCampaign}>Wyślij</button>
                </div>
               <div>
                   <form>
                       <header className={styles.header}>Link Url:</header>
                       <input style={{width:"100%"}} onChange={event => setUrl(event.target.value)}/>
                   </form>
                   <form>
                       <header className={styles.header}>Zapytanie do AI:</header>
                       <textarea style={{width:"100%"}} rows="20" onChange={event => setMailContent(event.target.value)}></textarea>
                       <button className={styles.button} onClick={generateAiResponse}>Generuj</button>

                   </form>
                   <form>
                       <header className={styles.header}>Załączniki:</header>
                       <input className={styles.button} type="file" onChange={event => setAttachments(event.target.value)}></input>
                   </form>
               </div>

            </div>
        </>
    );
}
