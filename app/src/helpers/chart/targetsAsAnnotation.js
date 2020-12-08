import store from 'src/store';

const maxTarget = () => store.getters['user/maxTarget'];
const minTarget = () => store.getters['user/minTarget'];

const targets = [{
  type: 'line',
  drawTime: 'afterDatasetsDraw',
  display: true,
  id: 'lower',
  mode: 'horizontal',
  scaleID: 'y-axis-0',
  value: minTarget(),
  borderColor: 'orange',
  borderWidth: 2,
}, {
  type: 'line',
  drawTime: 'afterDatasetsDraw',
  display: true,
  id: 'higher',
  mode: 'horizontal',
  scaleID: 'y-axis-0',
  value: maxTarget(),
  borderColor: 'orange',
  borderWidth: 2,
}];
export default targets;
