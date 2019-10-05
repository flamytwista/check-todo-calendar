export default function (date: Date): string{
  // todo: попробовать применить Intl.DateFormatter
  return `${String(date.getFullYear())}-${String(date.getMonth())}-${String(date.getDate())}`
}
