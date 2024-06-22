import { type Dispatch, type ReactNode, type SetStateAction, createContext, useCallback, useEffect, useState } from "react";
import { type Activity, defaultActivity } from "../activity/types/Activity";

type ActivityProviderProps = {
    children: ReactNode,
};

type ActivityContextState = {
    activity: Activity,
    setActivity: Dispatch<SetStateAction<Activity>>,
    startActivity: () => Promise<void>,
    stopActivity: () => Promise<void>,
    active: boolean,
};

export const ActivityContext = createContext<ActivityContextState>({} as ActivityContextState);

export const ActivityProvider = (props: ActivityProviderProps) => {
    const [activity, setActivity] = useState<Activity>(defaultActivity);
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        const getActivity = async () => {
            const activity: Activity = await window.api.getActivity();
            setActivity(activity);
        };
        getActivity();
    }, []);

    const startActivity = useCallback(async () => {
        const isActive = await window.api.startActivity();
        setActive(isActive);
    }, []);

    const stopActivity = useCallback(async () => {
        const isActive = await window.api.stopActivity();
        setActive(isActive);
    }, []);

    return (
        <ActivityContext.Provider
            value={{
                activity,
                setActivity,
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
