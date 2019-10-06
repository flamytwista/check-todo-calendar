import {Component, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import {useStore} from 'vuex-simple';
import { MyStore } from '@/store/store';

import TodoList from '@/components/TodoList/TodoList';


import styles from './TodoListHolder.css?module'


@Component
export default class TodoListHolder extends VueComponent {

  public store: MyStore = useStore(this.$store);

  selectedDate = new Date()

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
        <TodoList
          class={`todoList ${styles.todoList}`}
          selectedDate={this.selectedDate}
        />
      </div>
    )
  }
}
