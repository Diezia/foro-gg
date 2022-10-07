import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

interface IValoration {
  id: number;
  user_id: number;
  post_id: number;
}

@Injectable({ lifeTime: DependencyLifeTime.Transient })
export class Valoration implements IValoration {
  id: number = 0;
  user_id: number = 0;
  post_id: number = 0;
}
