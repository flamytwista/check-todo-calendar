import {Component, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';

import styles from './TodoListHolder.css?module'

interface Props {
  msg: string
}

@Component
export default class TodoListHolder extends VueComponent<Props> {

  ddd = [
    new Date(2019, 9, 2),
    new Date(2019, 9, 10),
    new Date(2019, 9, 22),
  ]

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
    return this.ddd
  }
  set datesWithTasks(value) {
    this.ddd = value
  }

  mounted(){
    setTimeout(()=>{
      this.ddd = [
        new Date(2019, 9, 5),
        new Date(2019, 9, 11),
        new Date(2019, 9, 23),
      ]
    },2000)
  }
  render() {
    return (
      <div class={"todoListHolder " + styles.todoListHolder}>
        <v-date-picker
          class={styles.vCalendar}
          attributes={this.calendarAttrs}
          v-model={this.selectedDate}
          is-inline
          first-day-of-week="2"
          locale="ru"
      />
        <div class={styles.todoList}>todo-list</div>
      </div>
    )
  }
}
