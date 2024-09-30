import { type DependencyList, useEffect } from "react";

const useInterval = (ms: number, callback: () => void | Promise<void>, immediate: boolean = false, deps?: DependencyList) => {
    useEffect(() => {
        let cancelled = false;

        const task = async () => {
            if (!cancelled)
                await callback();
        };

        if (immediate)
            task();

        const interval = setInterval(task, ms);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, deps);
};

export default useInterval;
