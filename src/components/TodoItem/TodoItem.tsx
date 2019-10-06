import {Component, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import {useStore} from 'vuex-simple';
import { MyStore } from '@/store/store';

import Task from '@/data-types/Task';
import styles from './TodoItem.css?module'


interface Props {
  task: Task
}

@Component
export default class TodoItem extends VueComponent<Props> {

  public store: MyStore = useStore(this.$store);

  @Prop()
  private task!: Task;

  async changeDone(){
    this.task.done = !this.task.done
    await this.store.tasks.updateTask(this.task)
    // console.log('changeDone')
  }

  render() {
    return (
      <div class={"todoItem " + styles.todoItem}>
        <input
          type="checkbox"
          name="checkbox"
          checked={this.task.done}
          onchange={this.changeDone}
        />
        <div class={styles['todoItem__time']}>{this.task.humanTime}</div>
        <div class={styles['todoItem__text']}>{this.task.text}</div>
      </div>
    )
  }
}
