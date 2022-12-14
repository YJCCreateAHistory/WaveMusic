// Parse the time to string
export const useDate = (time?: object | string | number | null, cFormat?: string): string | null => {
    if (time === undefined || !time) {
        return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date: Date;
    if (typeof time === "object") {
        date = time as Date;
    } else {
        if (typeof time === "string") {
            if (/^[0-9]+$/.test(time)) {
                time = parseInt(time);
            } else {
                time = time.replace(new RegExp(/-/gm), "/");
            }
        }
        if (typeof time === "number" && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj: { [key: string]: number } = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];

        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
            return `星期${["日", "一", "二", "三", "四", "五", "六"][value]}`;
        }
        return value.toString().padStart(2, "0");
    });
    return timeStr;
};