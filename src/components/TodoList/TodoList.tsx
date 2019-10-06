import {Component, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
//@ts-ignore
import { Fragment } from 'vue-fragment'

import TodoItem from '@/components/TodoItem/TodoItem';

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
  get areTasksFromServerFetched(){
    return this.store.tasks.getAreTasksFromServerFetched
  }
  get thereAreTasksForToday(){
    return this.tasks.length > 0
  }

  render() {
    return (
      <div class={"todoList " + styles.todoList}>
        {this.areTasksFromServerFetched ? (
          <Fragment>
            <p>
              {this.thereAreTasksForToday ? 'Задачи' : 'Задач на сегодня нет'}
            </p>
            {this.tasks.map((task) =>

              <TodoItem
                key={String(task.id)}
                task={task}
              />
            )}
          </Fragment>
        ) : (
          <p>Загрузка</p>
        )}
      </div>
    )
  }
}
