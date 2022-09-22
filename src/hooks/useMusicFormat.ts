export const useMusicFormat = <T>(val: T) => {
    let t = ~~val;
    let m = "" + ~~(t / 60);
    let s = "" + (t % 60);
    if (m == "0") {
        m = "00";
    } else if (m.length == 1) {
        m = "0" + m;
    }
    if (s.length == 1) {
        s = "0" + s;
    }
    return m + ":" + s  
}