import * as pathFinder from "javascript-astar";

import { Path } from "./path";

export function solve(house, start, end) {
    const graph = new pathFinder.Graph(house.houseLayout, {diagonal: false});

    let startWith, endWith, startPoint, resultPath;

    try {
        startWith = graph.grid[house.getFloor(start.floor)][house.getRoom(start.room)];
        endWith = graph.grid[house.getFloor(end.floor)][house.getRoom(end.room)];
        startPoint = [new Path(start.floor, start.room, 0)];

        resultPath = pathFinder.astar.search(graph, startWith, endWith);
    } catch (err) {
        alert('It is impossible to reach the specified room. Please check the configuration');
        return [];
    }

    if (resultPath.length === 0) {
        alert('It seems that you have no direct path to the specified room. Please enter another initial data');
        return [];
    }

    return startPoint.concat(resultPath.map(path => new Path(house.getFloor(path.x), house.getRoom(path.y), path.weight)));
}
