"use client"

import { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';

interface Params {
    label?: string;
    value: string;
}

interface UseDebounceProps {
    onSuccess?: ({ label, value }: Params) => Promise<void>;
    timeout?: number;
}

export const useDebounce = (options: UseDebounceProps) => {
    const { onSuccess, timeout = 1000 } = options

    const [params, setParams] = useState<Params>({ label: undefined, value: "" });
    const [firstLoading, setFirstLoading] = useState<boolean>(true);

    const handleChange = ({ label, value }: Params) => {
        setParams({ ...params, label, value });
    };

    const debouncedFunction = useMemo(() => {
        return _.debounce(async () => {
            if (onSuccess) {
                await onSuccess({ label: params.label, value: params.value });
            }
        }, timeout);
    }, [params]);

    useEffect(() => {
        if (!firstLoading) {
            debouncedFunction();
        } else {
            setFirstLoading(false);
        }
        return () => {
            debouncedFunction.cancel();
        };
    }, [params]);

    return { handleChange, text: (params.value || "") };
};