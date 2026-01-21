import styles from './App.module.css';
import {Header} from "./components/Header";
import {Tabs} from "./components/Tabs";
import {Info} from "./components/Info/Info.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {useEffect} from "react";
import {setHistory} from "./features/historyReducer.ts";
import {setIssues} from "./features/issuesReducer";
import { loadDismissState } from "./features/dismissReducer";
import { useAppDispatch } from "./hooks";


function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadDismissState());
    }, [dispatch]);

    // ✅ Șterge badge-ul la deschiderea popup-ului
    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.action) {
            chrome.action.setBadgeText({ text: '' });
        }
    }, []);

    // ✅ Golește issues când popup-ul devine hidden (la închidere)
    useEffect(() => {
        if (typeof chrome === 'undefined' || !chrome.storage?.local) {
            return;
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                chrome.storage.local.set({ issues: [] });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (typeof chrome === 'undefined' || !chrome.storage?.local) {
            return;
        }

        chrome.storage.local.get(['history', 'issues'], (result) => {
            if (Array.isArray(result.history)) {
                dispatch(setHistory(result.history));
            }
            if (Array.isArray(result.issues)) {
                dispatch(setIssues(result.issues));
                // ❌ ȘTERS - nu mai golim aici
            }
        });

        const listener = (
            changes: { [key: string]: chrome.storage.StorageChange },
            area: string
        ) => {
            if (area !== 'local') return;

            if (changes.history?.newValue) {
                dispatch(setHistory(changes.history.newValue));
            }

            if (changes.issues?.newValue) {
                const oldIssues = changes.issues.oldValue as any[] || [];
                const newIssues = changes.issues.newValue as any[];

                if (newIssues.length > oldIssues.length) {
                    const added = newIssues.filter(
                        n => !oldIssues.some(o => o.email === n.email)
                    );

                    if (added.length > 0) {
                        alert(`⚠️ Prompt Guard detected ${added.length} new email(s)`);
                    }
                }

                dispatch(setIssues(newIssues));
            }
        };

        chrome.storage.onChanged.addListener(listener);

        return () => {
            chrome.storage.onChanged.removeListener(listener);
        };
    }, [dispatch]);

    return (
        <>
            <div className={styles.app}>
                <Header title="Lasso Guard" subtitle="Security Home Assignment"/>
                <main className={styles.main}>
                    <Tabs/>
                    <Info/>
                </main>
                <Footer/>
            </div>
        </>
    )
}

export default App
