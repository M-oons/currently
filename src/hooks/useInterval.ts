import { type DependencyList, useEffect } from "react";
import { createTimer } from "../utils/time";

const useInterval = (ms: number, callback: () => void, immediate: boolean = false, deps?: DependencyList) => {
    useEffect(() => {
        const interval = createTimer(callback, ms, immediate);
        return () => clearInterval(interval);
    }, deps);
};

export default useInterval;
