import dayIdentifier from '../helpers/Date/dayIdentifier';


export default class Task {
  date: Date
  text: string

  constructor(payload: {
    date: Date
    text: string
  }) {
    this.date = payload.date;
    this.text = payload.text;
  }
  get dayIdentifier(): string {
    return dayIdentifier(this.date)
  }
  isSameDay(date: Date): boolean {
    return (
      this.date.getFullYear() === date.getFullYear()
      && this.date.getMonth() === date.getMonth()
      && this.date.getDate() === date.getDate()
    )
  }
}
