import { Module, State } from 'vuex-simple';
import { TasksModule } from '@/store/modules/tasks';

export class MyStore {

  @Module()
  public tasks = new TasksModule();

  @State()
  public version = "2.0.0";
}


