import { readFileSync } from "fs";
import type Activity from "./types/Activity";
import { parseActivity } from "./activityParser";

const ACTIVITY_FILE: string = "activity.json";

export const loadActivity = (): Activity | null => {
    try {
        const activityContent: string = readFileSync(`./${ACTIVITY_FILE}`, { encoding: "utf-8" });
        const activity: Activity | null = parseActivity(activityContent);
        return activity;
    }
    catch {
        // error reading file
    }

    return null;
};
