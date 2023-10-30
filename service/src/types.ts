


export interface Device {
    id: string; // assigned when device is added
    name: string; // provided when device is added
    lastSeen: number; // unix timestamp when device last pinged
    timerStart: number; // unix timestamp when timer was started
    timerDuration: number; // minutes
}
