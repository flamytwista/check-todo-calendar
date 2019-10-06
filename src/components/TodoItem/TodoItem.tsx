import {Component, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import Task from '@/data-types/Task';
import styles from './TodoItem.css?module'


interface Props {
  task: Task
}

@Component
export default class TodoList extends VueComponent<Props> {

  @Prop()
  private task!: Task;

  render() {
    return (
      <div class={"todoItem " + styles.todoItem}>
        {this.task.text}
      </div>
    )
  }
}
