import { useState, useEffect, useRef } from 'react';
import { Pollyx } from '../core/Pollyx';

export function usePolling(options = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [status, setStatus] = useState('idle');
    const elementRef = useRef(null);
    const pollingRef = useRef(null);

    useEffect(() => {
        if (!elementRef.current) {
            elementRef.current = document.createElement('div');
        }

        pollingRef.current = new Pollyx(elementRef.current, {
            ...options,
            onUpdate: (html, instance) => {
                setData(html);
                if (options.onUpdate) options.onUpdate(html, instance);
            },
            onError: (err, instance) => {
                setError(err);
                if (options.onError) options.onError(err, instance);
            },
            onStatusChange: (newStatus, data, instance) => {
                setStatus(newStatus);
                setIsFetching(newStatus === 'fetching');
                if (options.onStatusChange) options.onStatusChange(newStatus, data, instance);
            }
        });

        return () => {
            if (pollingRef.current) {
                pollingRef.current.destroy();
            }
        };
    }, [options.url, options.interval, JSON.stringify(options.retry)]);

    return {
        data,
        error,
        isFetching,
        status,
        start: () => pollingRef.current?.start(),
        stop: () => pollingRef.current?.stop(),
        refetch: () => pollingRef.current?.fetch(true)
    };
}