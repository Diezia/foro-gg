import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({ lifeTime: DependencyLifeTime.Transient })
export class User implements IUser {
  id: number = 0;
  name: string = "";
  email: string = "";
  password: string = "";
  role: string = "";
}
