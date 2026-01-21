import styles from './Info.module.scss'
import {NoIssues} from "../ui/NoIssues/NoIssues.tsx";

export function Info() {
    return  (
        <div className={styles.info}>
            <NoIssues icon="👀" title="No issues detected" subtitle="Your prompts are secure. We'll alert you if we detect any sensitive data."/>
        </div>
    );
}
