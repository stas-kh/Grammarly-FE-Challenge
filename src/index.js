import { solve } from "./solver";
import { times } from "./data";
import { House } from "./house";

window.go = () => {
  const house = new House(times);
  const res = solve(
    house,
    { floor: window.currentFloor.value, room: window.currentRoom.value },
    { floor: window.nextFloor.value, room: window.nextRoom.value }
  );

  window.currentFloor.value = window.nextFloor.value;
  window.currentRoom.value = window.nextRoom.value;

  window.buildHouse(house);
  window.animate(res);
};

window.buildHouse = (house) => {
  window.destroyHouse();

  house.houseLayout.forEach((currFloor, index) => {
      const floor = document.createElement('div');
      const floorIndex = house.getFloor(index);

      floor.style.height = `${100 / house.houseLayout.length}%`;

      currFloor.forEach((roomWeight, roomIndex) => {
          const room = window.createRoom(roomWeight, house.getRoom(roomIndex), floorIndex, `${100 / currFloor.length}%`);
          floor.appendChild(room);
      });

      window.house.appendChild(floor);
  });
};

window.createRoom = (roomWeight, roomIndex, floorIndex, width) => {
    const room = document.createElement('div');
    const textHolder = document.createElement('span');
    const text = document.createTextNode(roomWeight);

    room.classList.add('room');
    room.classList.add(`room-${floorIndex}-${roomIndex}`);

    if (roomWeight === 0) {
        room.classList.add('empty-room');
    }

    room.style.width = width;

    textHolder.appendChild(text);
    room.appendChild(textHolder);

    return room;
};

window.destroyHouse = () => {
    window.house.innerHTML = '';
};

window.animate = (result) => {
    result.reduce((memo, curr) => {
        const animationDelay = curr.animaitonTime + memo;
        window.openRoom(curr.floor, curr.room, animationDelay);
        return animationDelay;
    }, 0);
};

window.openRoom = (floor, room, delay) => {
    setTimeout(() => {
        document.querySelector(`.room-${floor}-${room}`).classList.add('opened');
    }, delay);
};
