import { readFileSync, writeFileSync } from "fs";
import type Activity from "./types/Activity";
import { parseActivity } from "./activityParser";

const ACTIVITY_FILE: string = "activity.json";

export const loadActivity = (): Activity | null => {
    try {
        const activityContent = readFileSync(`./${ACTIVITY_FILE}`, { encoding: "utf-8" });
        const activity = parseActivity(activityContent);
        return activity;
    }
    catch {
        // error reading file
    }

    return null;
};

export const saveActivity = (activity: Activity) => {
    try {
        const activityContent = JSON.stringify(activity, null, 4);
        writeFileSync(`./${ACTIVITY_FILE}`, activityContent, { encoding: "utf-8" });
    }
    catch {
        // error writing file
    }
};
