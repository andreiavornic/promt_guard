import styles from './Header.module.scss';
import type {HeaderProps} from "../../interfaces/headerProps.ts";
import {Switcher} from "../ui/Switcher";

export function Header({title, subtitle}: HeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    🛡️
                </div>
                <div className={styles.name}>
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>
                <div className={styles.spacer}/>
                <Switcher />
            </div>

        </header>
    )
}

