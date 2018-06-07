import model from './model/model';
import keyboard from './keyboard';

const areaTxt = {};
let area;


areaTxt.init = function() {
  area = document.getElementById('txt');
  model.setArea(area);

};

export default areaTxt;
