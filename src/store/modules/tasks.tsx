import {Action, Getter, Mutation, State} from 'vuex-simple';
import Task from '../../DataTypes/Task';
import _uniqBy from 'lodash/uniqBy'
import dayIdentifier from '../../helpers/Date/dayIdentifier';


export class TasksModule {
  @State()
  public tasks: Task[] = [];


  @Action()
  public async fetchTasks() {
    // эмуляция запроса за существующими задачами
    await new Promise(r => setTimeout(r, 1000));
    const tasksFromResponse = [
      {date: new Date(2019, 9, 2), text: 'Первая задача' },
      {date: new Date(2019, 9, 10), text: 'Вторая задача' },
      {date: new Date(2019, 9, 22), text: 'Третья задача' },
    ]
    const tasks = tasksFromResponse.map((task)=>{
      return new Task({date: task.date, text: task.text})
    })
    this.setTasks(tasks)
  }

  @Mutation()
  public setTasks(tasks: Task[]) {
    this.tasks = tasks
  }

  @Getter()
  public get tasksByDate() {
    return (date: Date) => {
      let result = this.tasks.filter((task)=>{
        return task.isSameDay(date)
      })
      // todo: упорядочить что получилось по возрастанию
      return result
    }
  }

  @Getter()
  public get datesWithTasks(): Date[] {
    // todo: поменять местами для увеличения производительности
    let dates = this.tasks.map((task)=>{
      return new Date(task.date.getFullYear(), task.date.getMonth(), task.date.getDate())
    })
    dates = _uniqBy(dates, ((date)=>{
      return dayIdentifier(date)
    }))
    return dates
  }
}
