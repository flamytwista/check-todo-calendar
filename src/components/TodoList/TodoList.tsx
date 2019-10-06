import {Component, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
//@ts-ignore
import { Fragment } from 'vue-fragment'

import TodoItem from '@/components/TodoItem/TodoItem';
import TaskCreator from '@/components/TaskCreator/TaskCreator';

import {useStore} from "vuex-simple";
import {MyStore} from "@/store/store";

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
        <p class={"todoList " + styles['todoList__header']}>
          {
            !this.areTasksFromServerFetched ? 'Загрузка' :
              this.thereAreTasksForToday ? 'Задачи' : 'Задач на сегодня нет'
          }
        </p>
        {this.areTasksFromServerFetched && (
          <Fragment>
            <div class={'cool-scrollbars ' + styles['todoList__items-wrapper']}>
              {this.tasks.map((task) =>

                <TodoItem
                  class={styles.todoItem}
                  key={String(task.id)}
                  task={task}
                />
              )}
            </div>
            <div class={styles['todoList__pusher']}></div>
            <TaskCreator
              selectedDate={this.selectedDate}
              class={styles['todoList__taskCreator']}
            />
          </Fragment>
        )}
      </div>
    )
  }
}
