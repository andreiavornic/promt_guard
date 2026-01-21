import {NoIssues} from "../ui/NoIssues/NoIssues.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import styles from "./Issues.module.scss";
import {DetectedItem} from "../ui/DetectedItem/DetectedItem";

export function Issues() {
    const items = useSelector(
        (state: RootState) => state.issues.items
    );
    return (
        items.length > 0 ? (
            <div className={styles['issues-block']}>
                {[...items].reverse().map(item => (
                    <DetectedItem key={item.id} item={item}/>
                ))}
            </div>
        ) : (<NoIssues
            icon="👀"
            title="No issues detected"
            subtitle="Your prompts are secure. We'll alert you if we detect any sensitive data."
        />)
    );
}
