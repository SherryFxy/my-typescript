import { useEffect, useState } from 'react'

export const isFalsy = (value) => value === 0 ? false : !value;

export const isVoid = (value) => value === undefined || value === null || value === ''

export const cleanObject = (object) => {
    const result = {...object};
    Object.keys(result).forEach(key => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result;
}

export const useMount = (callback) => {
    useEffect(() => {
        callback()
    }, [])
}

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value), delay)
        return () => clearTimeout(timer);
    }, [value, delay])

    return debounceValue;
}