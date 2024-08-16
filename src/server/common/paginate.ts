export function paginate<T>(list: T[], step: number) {
  return list.length ? [list.splice(0, step)].concat(paginate(list, step)) : []
}
