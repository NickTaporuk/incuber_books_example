const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const makeRequest = async (fn, data, ms = 2000, state = false) => {
    fn(state);
    await delay(ms);
    return data;
};
