import store from 'src/store';
import ChartAnnotation from 'chartjs-plugin-annotation';

const maxTarget = () => store.getters['user/maxTarget'];
const minTarget = () => store.getters['user/minTarget'];

const targets = () => [{
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

const addAnnotations = (object) => {
  const plugins = [ChartAnnotation];

  const annotation = {
    annotations: targets(),
  };

  const options = {
    ...object.options,
    annotation,
  };

  return ({
    ...object,
    plugins,
    options,
  });
};

export default addAnnotations;
