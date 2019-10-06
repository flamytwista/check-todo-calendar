import dayIdentifier from '@/helpers/Date/dayIdentifier';

// обычно id создается на сервере, но раза бэкэнда нет, то пусть id создается здесь.
let lastId: number = 0;

export default class Task {
  id: number
  date: Date
  text: string
  done: boolean

  constructor({date, text, done = false}:{
    date: Date
    text: string
    done?: boolean
  }) {
    this.id = lastId;
    this.date = date;
    this.text = text;
    this.done = done

    lastId += 1;
  }
  get dayIdentifier(): string {
    return dayIdentifier(this.date)
  }
  get humanTime(): string {
    let hours = (this.date.getHours() < 10 ? '0' : '') + this.date.getHours();
    let minutes = (this.date.getMinutes() < 10 ? '0' : '') + this.date.getMinutes();
    return `${hours}:${minutes}`
  }
  isSameDay(date: Date): boolean {
    return (
      this.date.getFullYear() === date.getFullYear()
      && this.date.getMonth() === date.getMonth()
      && this.date.getDate() === date.getDate()
    )
  }
}
