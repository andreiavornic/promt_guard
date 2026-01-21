import styles from './Tabs.module.scss';
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store";
import {setTab} from "../../features/controllerReducer.ts";

export function Tabs() {
    const dispatch = useDispatch();

    const tabs: { key: 'issues' | 'history'; label: string }[] = [
        { key: 'issues', label: '⚠️ Issues' },
        { key: 'history', label: '🕒 History' },
    ];

    const activeTab = useSelector(
        (state: RootState) => state.controller.activeTab
    );

    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => dispatch(setTab(tab.key))}
                    className={activeTab === tab.key ? styles.active : ''}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
