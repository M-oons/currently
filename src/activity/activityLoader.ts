import type Activity from "./types/Activity";

export const getActivity = (): Activity => {
    return {
        name: "Title",
        applicationId: "123",
        details: "Details",
        state: "State",
        count: {
            current: 1,
            max: 10,
        },
        imageLarge: {
            key: "large",
            text: "Large",
        },
        imageSmall: {
            key: "large",
            text: "Small",
        },
        timestampStart: Date.now(),
        timestampEnd: Date.now() + 100000,
        button1: {
            text: "Button 1",
            url: "http://localhost",
        },
        button2: {
            text: "Button 2",
            url: "http://localhost",
        },
    };
};
