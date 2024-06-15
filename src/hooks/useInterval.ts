import { type DependencyList, useEffect } from "react";

const useInterval = (ms: number, callback: () => void, deps?: DependencyList) => {
    useEffect(() => {
        const interval = setInterval(callback, ms);
        return () => clearInterval(interval);
    }, deps);
};

export default useInterval;
