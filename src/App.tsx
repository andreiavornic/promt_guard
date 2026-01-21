import styles from './App.module.css';
import {Header} from "./components/Header";
import {Tabs} from "./components/Tabs";
import {Info} from "./components/Info/Info.tsx";
import {Footer} from "./components/Footer/Footer.tsx";

function App() {

    return (
        <>
            <div className={styles.app}>
                <Header title="Promt Guard" subtitle="Real-Time Prompt Security"/>
                <main className={styles.main}>
                    <Tabs />
                    <Info/>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default App
