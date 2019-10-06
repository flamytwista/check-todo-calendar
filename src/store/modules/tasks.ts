import {Action, Getter, Mutation, State} from 'vuex-simple';
import Task from '@/data-types/Task';
import _uniqBy from 'lodash/uniqBy'
import dayIdentifier from '@/helpers/Date/dayIdentifier';

import tasksFromServer from '@/dummy-data/tasksFromServer';
import {allResolved} from "q";

export class TasksModule {
  @State()
  public tasks: Task[] = [];
  @State()
  public areTasksFromServerFetched: boolean = false;


  @Action()
  public async fetchTasks() {
    // эмуляция запроса к бэку за существующими задачами
    await new Promise(r => setTimeout(r, 1000));

    // создать Task[] из ответа сервера
    const tasks = tasksFromServer.map((task)=>{
      return new Task({date: task.date, text: task.text})
    })

    this.setTasks(tasks)
    this.setAreTasksFromServerFetched()

    return tasksFromServer
  }

  @Mutation()
  public setAreTasksFromServerFetched() {
    this.areTasksFromServerFetched = true;
  }

  @Mutation()
  public setTasks(tasks: Task[]) {
    this.tasks = tasks
  }

  @Getter()
  public get tasksByDate() {
    return (date: Date) => {
      // получить по дате
      let tasksForDate = this.tasks.filter((task)=>{
        return task.isSameDay(date)
      })

      // упорядочить по возрастанию
      tasksForDate = tasksForDate.sort((prevTask, nextTask)=>{
        return prevTask.date > nextTask.date ? 1 : prevTask.date < nextTask.date ? -1 : 0;
      })

      return tasksForDate
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
  @Getter()
  public get getAreTasksFromServerFetched() {
    return this.areTasksFromServerFetched
  }
}
