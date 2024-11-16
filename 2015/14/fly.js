export function fly({ time = 0, contestant = [] } = {}) {
    const { speed, air, cycleDistance, cycleTime } = contestant;

    let fullCycles = Math.floor(time / cycleTime);
    let lastCycleTime = Math.min(time % cycleTime, air);

    return {
        ...contestant,
        distance: cycleDistance * fullCycles + speed * lastCycleTime
    }
}

export function parse(data) {
    let [speed, air, rest] = /\.*?(\d+).*?(\d+).*?(\d+)/.exec(data).slice(1).map(Number);
    return { 
        speed, 
        air, 
        cycleTime: air + rest, 
        cycleDistance: speed * air, 
        distance: 0 
    };
}