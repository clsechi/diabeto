import { date } from 'quasar';
import sortBy from 'lodash/sortBy';
import max from 'lodash/max';
import min from 'lodash/min';

const { formatDate, buildDate } = date;

const sortByTimeReverse = records => sortBy(records, 'time').reverse();

const sortByTime = records => sortBy(records, 'time');

const reduceByDay = records => records.reduce((acc, record) => {
  const formatedDate = formatDate(record.time, 'D/MM/YY');
  const day = acc.find(ac => ac.formatedDate === formatedDate);
  if (day) {
    day.records.push(record);
  } else {
    acc.push({
      time: record.time,
      formatedDate,
      records: [record],
    });
  }
  return acc;
}, []);

const reduceByHour = records => records.reduce((acc, record) => {
  const formatedDate = formatDate(record.time, 'HH');
  const hour = acc.find(ac => ac.formatedDate === formatedDate);
  if (hour) {
    hour.records.push(record);
  } else {
    acc.push({
      time: buildDate({ hours: parseInt(formatedDate, 10) }),
      formatedDate,
      records: [record],
    });
  }
  return acc;
}, []);

const sumItems = (items, initilize = 0) => (
  items.reduce((acc, item) => {
    acc += item;
    return acc;
  }, initilize)
);

const mapKey = (item, key) => {
  if (!key.includes('.')) {
    return item[key];
  }
  let result = item;
  key.split('.').forEach((keyName) => {
    result = result[keyName];
  });
  return result;
};

// const mapKey = (item, key) => {
//   if (!key.includes('.')) return item[key];
//   return key.split('.').reduce((acc, cur) => (acc[cur] || acc), item);
// };

const mapByKey = (collection, key) => (
  collection
    .map((item) => {
      const keyValue = mapKey(item, key);
      return keyValue;
    })
    .filter(item => Boolean(item))
);

const calcAverage = (count, total) => Math.round(count / total);

const averageByKey = (collection, key) => {
  const items = mapByKey(collection, key);
  if (!items.length) return {};
  const itemsSum = sumItems(items);
  const average = calcAverage(itemsSum, items.length);
  return {
    count: items.length,
    items,
    average,
  };
};

const daysAverage = records => (
  reduceByDay(records)
    .map(day => ({
      time: day.time,
      dextro: averageByKey(day.records, 'dextro'),
      // meal: averageByKey(day.records, 'insulin.meal.value'),
      // correction: averageByKey(day.records, 'insulin.correction.value'),
      // basal: averageByKey(day.records, 'insulin.basal.value'),
    }))
);

const hourAverage = records => (
  reduceByHour(records)
    .map(hour => ({
      time: hour.time,
      hour: hour.formatedDate,
      dextro: averageByKey(hour.records, 'dextro'),
      // meal: averageByKey(hour.records, 'insulin.meal.value'),
      // correction: averageByKey(hour.records, 'insulin.correction.value'),
      // basal: averageByKey(hour.records, 'insulin.basal.value'),
    }))
);

const findHypoEvents = (dextros) => {
  const minTarget = 80;
  return dextros
    .filter(dextro => dextro <= minTarget)
    .length;
};

const findHyperEvents = (dextros) => {
  const maxTarget = 150;
  return dextros
    .filter(dextro => dextro >= maxTarget)
    .length;
};

const totalStats = (records) => {
  const dextros = mapByKey(records, 'dextro');

  const count = dextros.length;
  const average = calcAverage(sumItems(dextros), count);
  const higher = max(dextros);
  const lower = min(dextros);

  const hypoEvents = findHypoEvents(dextros);
  const hyperEvents = findHyperEvents(dextros);

  return {
    count,
    average,
    higher,
    lower,
    hypoEvents,
    hyperEvents,
    averageUnit: 0,
  };
};

const mapStats = ({ records, period }) => {
  const count = records.length;

  return {
    count,
    days: sortByTime(daysAverage(records)),
    hour: sortByTime(hourAverage(records)),
    total: totalStats(records, period),
  };
};

export const records = state => sortByTimeReverse(state.records);

export const period = state => state.period;

export const stats = state => mapStats(state);

export const recordsByDay = state => reduceByDay(sortByTimeReverse(state.records));
