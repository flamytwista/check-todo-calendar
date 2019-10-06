export default function (date: Date): string{
  return `${String(date.getFullYear())}-${String(date.getMonth())}-${String(date.getDate())}`
}
