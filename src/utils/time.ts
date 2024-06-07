export const formatTimestamp = (timestamp: number): string => {
    const totalSeconds = Math.floor(timestamp / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formatted = [];

    if (hours > 0)
        formatted.push(hours.toString().padStart(2, "0"));

    formatted.push(minutes.toString().padStart(2, "0"));
    formatted.push(seconds.toString().padStart(2, "0"));

    return formatted.join(":");
};
