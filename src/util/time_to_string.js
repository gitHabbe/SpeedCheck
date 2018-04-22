function include_minutes(time) {
    if (time >= 60) {
        let rest = (time % 60).toFixed(2);
        if (rest < 10) {
            rest = "0" + rest;
        }
        return String(Math.floor(time/60)) + ":" + rest;
    }
    return String(time)
}

module.exports = {
    include_minutes: include_minutes
}