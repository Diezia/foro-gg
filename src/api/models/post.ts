import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

interface IPost {
  id: number;
  title: string;
  body: string;
  valoration?: number;
  created_at: Date;
  updated_at?: Date;
  created_by: number;
  game_id: number;
  created_by_name: string;
}

@Injectable({ lifeTime: DependencyLifeTime.Transient})
export class Post implements IPost {
  id: number = 0;
  title: string = '';
  body: string = '';
  valoration?: number = 0;
  created_at: Date = new Date();
  updated_at?: Date = new Date();
  created_by: number = 0;
  game_id: number = 0;
  created_by_name: string = '';
}