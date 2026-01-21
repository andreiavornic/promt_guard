import styles from './Tabs.module.scss';

export function Tabs() {
    return (
        <div className={styles.tabs}>
            <button className={styles.active}>⚠️ Issues</button>
            <button>🕒 History</button>
        </div>
    );
}
