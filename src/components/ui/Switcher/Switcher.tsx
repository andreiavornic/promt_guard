import styles from './Switcher.module.scss';

export function Switcher() {
    const isDisabled = true;
    return (
        < >
            <button className={styles.switcher}>
                <div className={styles.item}>Dismiss 24h</div>
                <div className={`${styles.radio} ${isDisabled ? styles.disabled : ''}`}></div>
            </button>
        </>
    );
}

