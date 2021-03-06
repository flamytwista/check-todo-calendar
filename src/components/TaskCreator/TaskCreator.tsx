import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import Task from '@/data-types/Task.tsx';

import {useStore} from 'vuex-simple';
import { MyStore } from '@/store/store';

//@ts-ignore
import Debounce from 'debounce-decorator'

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

  isCreatingNow = false
  isSendingNow = false

  isTimeValid = false

  form = {
    time: '',
    text: ''
  }

  @Watch('selectedDate')
  onSelectedDateChanged() {
    this.reset()
  }

  @Watch('form.time')
  onFormTimeChanged() {
    this.validateTime()
  }

  get isTextValid(): boolean{
    return this.form.text.length > 0
  }
  get isFormValid(): boolean {
    return this.isTextValid && this.isTimeValid
  }
  get showCreationLoader(): boolean {
    return this.isSendingNow
  }
  get showCreationForm(): boolean {
    return this.isCreatingNow && !this.isSendingNow
  }
  get showCreateButton(): boolean {
    return !this.isCreatingNow && !this.isSendingNow
  }

  @Debounce(500)
  async validateTime(){

    // эмуляция проверки на сервере.
    await new Promise(r => setTimeout(r, 1500));

    this.isTimeValid = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/.test(this.form.time)
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
    this.isSendingNow = true
    await this.store.tasks.createTask(task);
    this.isSendingNow = false
    this.reset()
  }
  render() {
    return (
      <div class={styles.taskCreator}>
        {this.showCreationLoader &&
          <p class={styles['taskCreator__please-wait']}>Задача создается...</p>
        }
        {this.showCreateButton && (
          <button onClick={()=>{this.isCreatingNow = true}}>Создать</button>
        )}
        {this.showCreationForm &&
          <Fragment>
            <div
              class={styles['taskCreator__inputs']}
            >
              <input
                type="text"
                class={styles['taskCreator__time']}
                vModel={this.form.time}
                placeholder="13:14"
              />
              <input
                type="text"
                class={styles['taskCreator__text']}
                placeholder="текст"
                disabled={!this.isTimeValid}
                vModel={this.form.text}
              />
            </div>

            <div class={styles['taskCreator__buttons']}>
              <button onclick={this.reset}>Отмена</button>
              <button
                disabled={!this.isFormValid}
                onclick={this.create}
              >Сохранить
              </button>
            </div>
          </Fragment>
        }
      </div>
    )
  }
}
