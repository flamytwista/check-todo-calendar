import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import Task from '@/data-types/Task.tsx';

import {useModule, useStore} from 'vuex-simple';
import { MyStore } from '@/store/store';

//@ts-ignore
import { Fragment } from 'vue-fragment'
import styles from './TaskCreator.css?module'


interface Props {
  selectedDate: Date
}

@Component
export default class TaskCreator extends VueComponent<Props> {

  public store: MyStore = useStore(this.$store);

  @Prop()
  private selectedDate!: Date

  // isCreatingNow = false
  isCreatingNow = true    // todo: временно для разработки. Потом удалить.

  form = {
    time: '',
    text: ''
  }

  @Watch('selectedDate')
  onPropertyChanged() {
    this.reset()
  }
  get isTimeValid(): boolean{
    // вариант только для например 12:06
    return /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/.test(this.form.time)
    // вариант для например 12:06 и 12:6
    // return /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):([0-9]|0[0-9]|[1-5][0-9])$/.test(this.form.time)
  }
  get isTextValid(): boolean{
    return this.form.text.length > 0
  }
  get isFormValid(): boolean {
    return this.isTextValid && this.isTimeValid
  }

  reset(){
    this.form.time = ''
    this.form.text = ''
    this.isCreatingNow = false
  }
  async create(){
    // получить отдельно часы и минуты из строки со временем
    let [hours, minutes] =
      this.form.time.split(":")
      .map((item)=>{return Number(item)})

    let date = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate(),
      hours,
      minutes
    )

    let task = new Task({
      date: date,
      text: this.form.text
    })
    await this.store.tasks.createTask(task);
    this.reset()
  }
  render() {
    return (
      <div class={styles.taskCreator}>
        {(!this.isCreatingNow) ? (
          <button onClick={()=>{this.isCreatingNow = true}}>Создать</button>
        ) : (
          <Fragment>
            <input
              type="text"
              vModel={this.form.time}
              placeholder="13:14"
            />
            <input
              type="text"
              placeholder="текст"
              disabled={!this.isTimeValid}
              vModel={this.form.text}
            />
            <button onClick={this.reset} >Отмена</button>
            <button
              disabled={!this.isFormValid}
              onClick={this.create}
            >Сохранить</button>
          </Fragment>
        )}

      </div>
    )
  }
}
