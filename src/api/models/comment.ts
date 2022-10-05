import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

interface IComment {
  id: number;
  body: string;
  created_at: Date;
  created_by: number;
  post_id: number;
  created_by_name: string;
}

@Injectable({ lifeTime: DependencyLifeTime.Transient})
export class Comment implements IComment {
  id: number = 0;
  body: string = '';
  created_at: Date = new Date();
  created_by: number = 0;
  post_id: number = 0;
  created_by_name: string = '';
}