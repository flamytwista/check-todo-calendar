import {Component, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import Task from '@/data-types/Task';
import styles from './TodoItem.css?module'


interface Props {
  task: Task
}

@Component
export default class TodoItem extends VueComponent<Props> {

  @Prop()
  private task!: Task;

  render() {
    return (
      <div class={"todoItem " + styles.todoItem}>
        <div class={styles['todoItem__time']}>{this.task.humanTime}</div>
        <div class={styles['todoItem__text']}>{this.task.text}</div>
      </div>
    )
  }
}
