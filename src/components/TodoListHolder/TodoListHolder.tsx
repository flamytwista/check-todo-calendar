import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';

import styles from './TodoListHolder.css?module'

interface Props {
  msg: string
}

@Component
export default class TodoListHolder extends VueComponent<Props> {

  @Prop()
  private msg!: string;

  render() {
    return (
      <div class={"todoListHolder " + styles.todoListHolder}>
        <v-calendar />
        <div class={styles.todoList}>todo-list</div>
      </div>
    )
  }
}
