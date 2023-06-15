//change time from ms to date
export const timeChanger = (time) => {
    const timestamp = Number(time);
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('uk-UK', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC',
    });
    return formattedDate;
};
//get days from registered till today
export const dayOnSite = (date) => {
    const toDay = new Date()
    const startDate = new Date(Number(date))
    const timeDiff = toDay.getTime() - startDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
};
//get hours from registered till now
export const lastLogin = (date) => {
    const toDay = new Date()
    const startDate = new Date(Number(date))
    const timeDiff = toDay.getTime() - startDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
};