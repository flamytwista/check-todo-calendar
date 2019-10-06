import {Component, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import {useModule, useStore} from 'vuex-simple';
import { MyStore } from '@/store/store';
import { TasksModule } from '@/store/modules/tasks';


import styles from './TodoListHolder.css?module'

interface Props {
  msg: string
}

@Component
export default class TodoListHolder extends VueComponent<Props> {

  public store: MyStore = useStore(this.$store);
  public foo1?: TasksModule = useModule(this.$store, ['tasks']);

  selectedDate = new Date()

  @Prop()
  private msg!: string;

  get calendarAttrs() {
    return [
      {
        key: 'datesWithTasks',
        dot: {
          color: 'red',
          class: 'my-dot-class',
        },
        dates: this.datesWithTasks,
      }
    ]
  }

  get datesWithTasks() {
    return this.store.tasks.datesWithTasks;
  }
  get tasks() {
    return this.store.tasks.tasksByDate(this.selectedDate)
  }

  created(){
    this.store.tasks.fetchTasks()
  }
  render() {
    return (
      <div class={"todoListHolder " + styles.todoListHolder}>
        <v-date-picker
          class={styles.vCalendar}
          attributes={this.calendarAttrs}
          v-model={this.selectedDate}
          is-inline
          first-day-of-week={2}
          locale="ru"
      />
        <div class={styles.todoList}>
          todo-list
          {this.tasks}
        </div>
      </div>
    )
  }
}
