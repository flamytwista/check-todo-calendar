import { Module } from 'vuex-simple';
import { TasksModule } from '@/store/modules/tasks';

export class MyStore {

  @Module()
  public tasks = new TasksModule();

}


