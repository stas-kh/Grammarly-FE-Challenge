import * as pathFinder from "javascript-astar";

export function solve(times, start, end) {
  const house = new House(times);
  const graph = new pathFinder.Graph(times, { diagonal: false });

  const startWith = graph.grid[house.getFloor(start.floor)][house.getRoom(start.room)];
  const endWith = graph.grid[house.getFloor(end.floor)][house.getRoom(end.room)];

  const resultPath = pathFinder.astar.search(graph, startWith, endWith);

  return resultPath.map(path => ({
    floor: house.getFloor(path.x),
    room: house.getRoom(path.y),
    animationTime: path.weight
  }));
}

class House {
  constructor(array) {
    this.array = array;
  }
  getFloor(floor) {
    return (this.array.length - 1) - parseInt(floor, 10);
  }
  getRoom(room) {
    return parseInt(room, 10);
  }
}

window.solve = solve;
