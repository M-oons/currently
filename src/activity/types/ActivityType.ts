export const ActivityType = {
    Playing: 0,
    Listening: 2,
    Watching: 3,
    Competing: 5,
} as const;

export type ActivityType = typeof ActivityType[keyof typeof ActivityType];

export const getActivityTypeDisplay = (type: ActivityType): string => {
    switch (type) {
        case ActivityType.Playing:
            return "Playing";
        case ActivityType.Listening:
            return "Listening to";
        case ActivityType.Watching:
            return "Watching";
        case ActivityType.Competing:
            return "Competing in";
    }
};

export default ActivityType;
