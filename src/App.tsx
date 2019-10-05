import { Component, Vue } from 'vue-property-decorator';
import TodoListHolder from './components/TodoListHolder/TodoListHolder';

import './App.css'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <TodoListHolder msg="TodoListHolder"/>
      </div>
    )
  }
}
