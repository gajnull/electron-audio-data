export const something = 'test'

function getInfo (obj) {
  return `
    <div class="half rb">
      <div role = "caption"> Текущий отрезок (выбрано): </div>
      <div role = "curr-region"> ${obj.pozLocal} (${obj.start} - ${obj.end})</div>
    </div>
    <div class="half">
      <div role = "caption"> Позиция в файле/Всего: </div>
      <div role = "poz-file"> ${obj.pozTotal} / ${obj.total} </div>
    </div>
  `
}
