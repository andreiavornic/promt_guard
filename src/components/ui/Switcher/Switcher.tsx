import styles from './Switcher.module.scss';
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {activateGuard, dismissGuard} from "../../../features/dismissReducer.ts";
import {useEffect} from "react";
import Countdown from "../Countdown";

export function Switcher() {
    const dispatch = useDispatch();

    const {dismissed, timer} = useSelector(
        (state: RootState) => state.dismiss
    );

    useEffect(() => {
        if (timer && Date.now() > timer) {
            dispatch(activateGuard());
        }
    }, [timer, dispatch]);

    const handleClick = () => {
        if (dismissed) {
            dispatch(activateGuard());
        } else {
            dispatch(dismissGuard());
        }
    };

    return (
        < >
            <button className={styles.switcher} onClick={handleClick}>
                <div className={styles.item}>{dismissed && timer !== null ? <Countdown timer={timer}/> : "Dismiss 24h"}</div>
                <div className={`${styles.radio} ${dismissed ? styles.disabled : ''}`}></div>
            </button>
        </>
    );
}

