import {NoIssues} from "../ui/NoIssues/NoIssues.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import {DetectedItem} from "../ui/DetectedItem/DetectedItem.tsx";
import styles from './History.module.scss'

export function History() {
    const items = useSelector(
        (state: RootState) => state.history.items
    );
    return (
        items.length > 0 ? (
            <div className={styles['history-block']}>
                {[...items].reverse().map(item => (
                    <DetectedItem key={item.id} item={item}/>
                ))}
            </div>
        ) : (
            <NoIssues icon="📜" title="No history yet"
                      subtitle="Detected issues will appear here for your reference."/>
        ));
}
