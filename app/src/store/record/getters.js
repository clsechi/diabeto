import { date } from 'quasar';
import _ from 'lodash';

const { formatDate } = date;

const mapStats = (records) => {
  const size = records.length;

  return size;
};

const reduceByDay = records => records.reduce((acc, record) => {
  const formatedDate = formatDate(record.time, 'D/MM/YY');
  const day = acc.find(ac => ac.formatedDate === formatedDate);
  if (day) {
    day.records.push(record);
  } else {
    acc.push({ formatedDate, records: [record] });
  }
  return acc;
}, []);

// TODO dont use entire lodash
const sortByTime = records => (
  _.chain(records)
    .sortBy('time')
    .reverse()
    .value()
);

export const records = state => sortByTime(state.records);

export const stats = state => mapStats(state.records);

export const recordsByDay = state => reduceByDay(sortByTime(state.records));
