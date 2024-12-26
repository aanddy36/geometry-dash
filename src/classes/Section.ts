import { Square } from "./Square";
import { Triangle } from "./Triangle";

interface Props {
  id: number;
  leftLimit: number;
  rightLimit: number;
  obstacles: (Square | Triangle)[];
}

export class Section {
  id: number;
  leftLimit: number;
  rightLimit: number;
  obstacles: (Square | Triangle)[];

  constructor({ id, leftLimit, rightLimit, obstacles }: Props) {
    this.id = id;
    this.leftLimit = leftLimit;
    this.rightLimit = rightLimit;
    this.obstacles = obstacles;
  }
}
