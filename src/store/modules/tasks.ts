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
      return new Task({date: task.date, text: task.text, done: task.done})
    })

    this.setTasks(tasks)
    this.setAreTasksFromServerFetched()

    return tasksFromServer
  }
  @Action()
  public async createTask(task: Task){
    // эмуляция запроса
    await new Promise(r => setTimeout(r, 1000));

    this.addTask(task)
    return {} // вернули запрос от сервера
  }
  @Action()
  public async updateTask(task: Task){
    // здесь должен быть запрос на сервер

    this.putTask(task)
    return {} // вернули запрос от сервера
  }

  @Mutation()
  public putTask(task: Task) {
    // обновляем задачу по id
    let index = this.tasks.findIndex(currTask=>currTask.id === task.id)
    if (index !== -1) this.tasks.splice(index, 1, task)
  }

  @Mutation()
  public addTask(task: Task) {
    this.tasks.push(task)
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
    // К слову.
    // От выборок подобным таким как в этом геттере может спасти VuexORM.

    // получить невыполненые задачи
    let undoneTasks = this.tasks.filter(task => !task.done)

    // получить из каждого дня где есть задачи по одной задаче
    let oneTaskPerDay: Task[] = _uniqBy(undoneTasks, ((task)=>{
      // return task.dayIdentifier && !task.done
      return task.dayIdentifier
    }))

    // получить даты из этих задач
    const dates: Date[] = oneTaskPerDay.map((task)=>{
      return task.date
    })

    return dates
  }
  @Getter()
  public get getAreTasksFromServerFetched() {
    return this.areTasksFromServerFetched
  }
}
