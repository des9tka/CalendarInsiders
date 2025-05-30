export function formatDateKey(date: Date | string): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        console.error("Invalid date provided to formatDateKey:", date);
        return "";
    }

    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;
}

export function formatTimeDisplay(timeStr: string): string {
    if (!timeStr) return "";

    const timeParts = timeStr.split(":");
    if (timeParts.length < 2) return timeStr;

    const hours = timeParts[0];
    const minutes = timeParts[1];

    const hour = parseInt(hours, 10);
    if (isNaN(hour)) return timeStr;

    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

export function formatDateDisplay(date: Date | string): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        console.error("Invalid date provided to formatDateDisplay:", date);
        return "";
    }

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return dateObj.toLocaleDateString("en-US", options);
}
