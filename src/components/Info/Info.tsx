import styles from './Info.module.scss'
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import History from "../History";
import {Issues} from "../Issues/Issues.tsx";

export function Info() {

    const activeTab = useSelector(
        (state: RootState) => state.controller.activeTab
    );

    return (
        <div className={styles.info}>
            {activeTab === 'history' ? <History/> : <Issues/>}
        </div>
    );
}
