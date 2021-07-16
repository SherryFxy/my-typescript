import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => value === 0 ? false : !value;

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: object) => {
    const result = {...object};
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key];
        if (isVoid(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result;
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

export const useDebounce = <V>(value: V, delay: number) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value), delay)
        return () => clearTimeout(timer);
    }, [value, delay])

    return debounceValue;
}

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray);
    const removeIndex = (index: number) => {
        // const arr = value.slice(0, index).concat(value.slice(index + 1));
        const copy = [...value];
        copy.splice(index, 1);
        setValue(copy);
    }
    return {
        value,
        setValue,
        clear: () => setValue([]),
        removeIndex,
        add: (obj: T) => setValue([...value, obj])
    }
}