import {Component, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
//@ts-ignore
import { Fragment } from 'vue-fragment'
import styles from './TaskCreator.css?module'


interface Props {
  selectedDate: Date
}

@Component
export default class TodoItem extends VueComponent<Props> {

  @Prop()
  private selectedDate!: Date

  isCreatingNow = false
  isDataValid = false

  render() {
    return (
      <div class={styles.taskCreator}>
        {(!this.isCreatingNow) ? (
          <button onClick={()=>{this.isCreatingNow = true}}>Создать</button>
        ) : (
          <Fragment>
            <input type="text" placeholder="13:14"/>
            <input type="text" placeholder="текст"/>
            <button onClick={()=>{this.isCreatingNow = false}} >Отмена</button>
            <button disabled={!this.isDataValid}>Сохранить</button>
          </Fragment>
        )}

      </div>
    )
  }
}
