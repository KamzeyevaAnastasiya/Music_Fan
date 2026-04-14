export function isErrorWithProperty<T extends string>(error: unknown, property: T): error is Record<T, string> {
  return (
    typeof error === 'object' &&
    error != null &&
    property in error &&
    typeof (error as Record<string, unknown>)[property] === 'string'
  )
}
/* Синтаксис error is { message: string } означает, что если функция возвращает true, TypeScript будет рассматривать error как объект с обязательным строковым свойством message. */
