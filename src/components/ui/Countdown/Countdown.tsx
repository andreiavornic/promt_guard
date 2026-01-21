import { differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { activateGuard } from '../../../features/dismissReducer';

export function Countdown({ timer }: { timer: number }) {
    const dispatch = useDispatch();

    const [remaining, setRemaining] = useState(() =>
        Math.max(0, differenceInSeconds(timer, Date.now()))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const secondsLeft = Math.max(
                0,
                differenceInSeconds(timer, Date.now())
            );

            setRemaining(secondsLeft);

            if (secondsLeft === 0) {
                dispatch(activateGuard());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, dispatch]);

    const h = String(Math.floor(remaining / 3600)).padStart(2, '0');
    const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
    const s = String(remaining % 60).padStart(2, '0');

    return <span>{h}:{m}:{s}</span>;
}
