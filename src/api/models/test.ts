import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { ITest } from "./test.interface";

@Injectable({ lifeTime: DependencyLifeTime.Transient})
export class Test implements ITest {
  id: number = 0;
  name: string = '';
  age: number = 0;
  email: string = '';
}