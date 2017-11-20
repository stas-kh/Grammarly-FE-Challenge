class House {
    constructor(houseLayout) {
        this.houseLayout = houseLayout;
    }
    getFloor(floor) {
        return (this.houseLayout.length - 1) - parseInt(floor, 10);
    }
    getRoom(room) {
        return parseInt(room, 10);
    }
}

export { House };