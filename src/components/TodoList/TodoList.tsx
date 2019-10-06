import {Component, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import {useStore} from "vuex-simple";
import {MyStore} from "@/store/store";
import Task from '@/data-types/Task';

import styles from './TodoList.css?module'



interface Props {
  selectedDate: Date
}

@Component
export default class TodoList extends VueComponent<Props> {

  @Prop()
  private selectedDate!: Date;

  public store: MyStore = useStore(this.$store);

  get tasks() {
    return this.store.tasks.tasksByDate(this.selectedDate)
  }
  get thereAreTasksForToday(){
    return this.tasks.length > 0
  }

  render() {
    return (
      <div class={"todoList " + styles.todoList}>
        <p>
          {this.thereAreTasksForToday ? 'Задачи' : 'Задач на сегодня нет'}
        </p>
        todo-list
        {this.tasks}
      </div>
    )
  }
}
