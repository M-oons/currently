import { useContext } from "react";
import { ActivityContext } from "../providers/ActivityProvider";

const useActivity = () => {
    return useContext(ActivityContext);
};

export default useActivity;
