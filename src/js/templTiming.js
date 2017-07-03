//export const something = 'test'
export const clog = 'console.log'

function getViewTiming (data) {
  const pozLocal = data.pozLocal
  const start = data.start
  const end = data.end
  const pozTotal = data.pozTotal
  const total = data.total
  return `
    <div class="half rb">
      <div role = "caption"> Текущий отрезок (выбрано): </div>
      <div role = "curr-region"> ${pozLocal} (${start} - ${end})</div>
    </div>
    <div class="half">
      <div role = "caption"> Позиция в файле/Всего: </div>
      <div role = "poz-file"> ${pozTotal} / ${total} </div>
    </div>
  `


}
