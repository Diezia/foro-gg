import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

interface IGame {
  id: number;
  name: string;
  image_url: string;
}

@Injectable({ lifeTime: DependencyLifeTime.Transient })
export class Game implements IGame {
  id: number = 0;
  name: string = "";
  image_url: string = "";
}
