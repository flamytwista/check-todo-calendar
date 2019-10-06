import { Component, Vue } from 'vue-property-decorator';
import TodoListHolder from '@/components/TodoListHolder/TodoListHolder';

import '@/App.css'
import styles from '@/App.module.css?module'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app" class={styles.app}>
        <TodoListHolder class={styles.todoListHolder}/>
      </div>
    )
  }
}
