import type {DetectedItemProps} from "../../../interfaces/detectedItemProps.ts";
import {formatDate} from "../../../utils/formatDate.ts";
import styles from './DetectedItem.module.scss'

export function DetectedItem({item}: DetectedItemProps) {
    return (
        <div key={item.id} className={styles.item}>
            <span className={styles.email}>{item.email}</span>
            <span className={styles.date}>Detected on: {formatDate(item.createdAt)}</span>
        </div>
    );
}
