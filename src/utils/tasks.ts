export const runWithTimeout = async (interval: number, task: () => any): Promise<void> => {
    return new Promise(async (resolve) => {
        const timeout = setTimeout(resolve, interval);

        try {
            await task();
        }
        catch { }

        clearTimeout(timeout);
        resolve();
    });
};
