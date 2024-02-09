    export function fetchCalendar(url: string, p: { headers: { "X-Requested-With": string } }) {
        return new Promise<{ data: string }>(
            () => fetch(url).then(r => r.blob()).then(b => URL.createObjectURL(b))
        );
    }
