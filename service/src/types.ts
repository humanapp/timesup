export type Device = {
    id: string; // assigned when device is added
    name: string; // provided when device is added
    lastSeen: number; // unix timestamp when device last pinged
    timerStart: number; // unix timestamp when timer was started
    timerDuration: number; // minutes
};

export type DeviceMap = {
    [deviceid: string]: Device;
};

// Shutdown in X minutes
export type ShutdownInEvent = {
    id: string;
    type: "shutdown-in";
    durationMins: number; // minutes
    startedAt: number; // unix timestamp
};

// Shutdown at X time
export type ShutdownAtEvent = {
    id: string;
    type: "shutdown-at";
    shutdownAt: number; // unix timestamp
};

export type ShutdownEvent = ShutdownInEvent | ShutdownAtEvent;

// Show a message to the user
export type MessageEvent = {
    id: string;
    type: "message";
    createdAt: number; // unix timestamp
    message: string;
};

// Go look for an update and apply it
export type UpdateEvent = {
    id: string;
    type: "update";
};

export type MessageMap = {
    [messageid: string]: MessageEvent;
};
