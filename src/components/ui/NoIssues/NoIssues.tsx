import styles from './NoIssues.module.scss'
import type{NoIssuesProps} from "../../../interfaces/noIssuesProps.ts";

export function NoIssues({icon, title, subtitle}: NoIssuesProps) {
    return (
        <div className={styles.container}>
            <div className={styles['info-block']}>
                <div className={styles.icon}>{icon}</div>
                <h4>{title}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );
}
