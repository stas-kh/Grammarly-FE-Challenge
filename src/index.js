import { solve } from "./solver";
import { times } from "./data";

window.go = () => {
  const res = solve(
    times,
    { floor: window.currentFloor.value, room: window.currentRoom.value },
    { floor: window.nextFloor.value, room: window.nextRoom.value }
  );

  window.currentFloor.value = window.nextFloor.value;
  window.currentRoom.value = window.nextRoom.value;

  window.buildHouse(times);
  window.animate(res);
};

window.buildHouse = (houseMatrix) => {
  window.destroyHouse();

  houseMatrix.forEach((curr, index) => {
      const floor = document.createElement('div');
      const currFloor = houseMatrix.length - 1 - index;

      floor.style.height = `${100 / houseMatrix.length}%`;

      curr.forEach((roomWeight, roomIndex) => {
          const room = document.createElement('div');
          const textHolder = document.createElement('span');
          const text = document.createTextNode(roomWeight);

          room.classList.add('room');
          room.classList.add(`room-${currFloor}-${roomIndex}`);

          room.style.width = `${100 / curr.length}%`;

          textHolder.appendChild(text);
          room.appendChild(textHolder);
          floor.appendChild(room);
      });

      window.house.appendChild(floor);
  });
};

window.animate = (result) => {
  result.reduce((memo, curr) => {
      const animationDelay = curr.animationTime + memo;
      window.openRoom(curr.floor, curr.room, animationDelay);
      return animationDelay;
  }, 0);
};

window.openRoom = (floor, room, delay) => {
    setTimeout(() => {
        document.querySelector(`.room-${floor}-${room}`).classList.add('opened');
    }, delay);
};

window.destroyHouse = () => {
    window.house.innerHTML = '';
};