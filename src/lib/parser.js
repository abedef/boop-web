export function itemMapper(item) {
    let parts = item.match(/^(\d+)\s(\d+)\s([\s\S]+)/);

    if (parts) {
        let unix_timestamp = new Date(parseInt(parts[2]) * 1000);
        let id = parts[1];
        let date = unix_timestamp?.toDateString();
        let hour = unix_timestamp?.getHours();
        let text = parts[3];

        return { id, date, hour, text };
    }

    console.error(`could not match ${item}`);

    return { id: 0, date: "", hour: 0, text: "" };
}