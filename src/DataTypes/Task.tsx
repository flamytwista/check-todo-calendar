export default class Task {
  date: Date
  text: String

  constructor(payload: {
    date: Date
    text: String
  }) {
    this.date = payload.date;
    this.text = payload.text;
  }
}
