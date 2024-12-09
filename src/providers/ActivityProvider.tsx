import { type ReactNode, createContext, useCallback, useEffect, useState } from "react";
import type Activity from "../activity/types/Activity";

type ActivityProviderProps = {
    children: ReactNode,
};

type ActivityContextState = {
    activity: Activity | null,
    setActivity: (activity: Activity) => void,
    startActivity: () => Promise<void>,
    stopActivity: () => Promise<void>,
    active: boolean,
};

export const ActivityContext = createContext<ActivityContextState>({} as ActivityContextState);

export const ActivityProvider = (props: ActivityProviderProps) => {
    const [activity, setActivity] = useState<Activity | null>(null);
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        const getActivity = async () => {
            const activity = await window.activity.getActivity();
            const active = await window.activity.getActiveState();
            setActivity(activity);
            setActive(active);
        };
        getActivity();
    }, []);

    const startActivity = useCallback(async () => {
        const isActive = await window.activity.startActivity();
        setActive(isActive);
    }, []);
    
    const stopActivity = useCallback(async () => {
        const isActive = await window.activity.stopActivity();
        setActive(isActive);
    }, []);

    const updateActivity = useCallback((activity: Activity) => {
        setActivity(activity);
        window.activity.setActivity(activity);
    }, []);

    return (
        <ActivityContext.Provider
            value={{
                activity,
                setActivity: updateActivity,
                startActivity,
                stopActivity,
                active,
            }}
        >
            {props.children}
        </ActivityContext.Provider>
    );
};

export default ActivityProvider;
