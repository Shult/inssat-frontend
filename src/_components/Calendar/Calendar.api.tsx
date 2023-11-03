import {REMOTE_URL} from "./Calendar.const";

export function fetchCalendar(url = REMOTE_URL, p: { headers: { "X-Requested-With": string } }) {
    return new Promise<{ data: string }>(
        () => fetch(url).then(r => r.blob()).then(b => URL.createObjectURL(b))
    );
}
