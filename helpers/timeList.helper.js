const dayjs = require("dayjs");

module.exports.generateTimeList = (date) => {
    const timeList = [];

    const currentTime = dayjs().add(30, "minute");
    const currentHour = currentTime.hour();
    const currentMinute = currentTime.minute();

    for (let hour = 8; hour <= 16; hour++) {
        if (hour === 12) continue;

        if (dayjs().format("DD/MM/YYYY") === date) {
            if (hour < currentHour) continue;
            if (hour === currentHour) {
                if (currentMinute > 30) {
                    continue;
                } else {
                    timeList.push(`${hour.toString().padStart(2, "0")}:30`);
                    continue;
                }
            }
        }

        timeList.push(`${hour.toString().padStart(2, "0")}:00`);
        timeList.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return timeList;
}