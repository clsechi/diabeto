import { date } from 'quasar';

const { formatDate } = date;

const mapStats = (records) => {
  const size = records.length;

  return size;
};

const reduceByDay = records => records.reduce((acc, record) => {
  const formatedDate = formatDate(record.createdAt, 'D/MM/YY');
  const day = acc.find(ac => ac.formatedDate === formatedDate);
  if (day) {
    day.records.push(record);
  } else {
    acc.push({ formatedDate, records: [record] });
  }
  return acc;
}, []);

export const records = state => state.records;

export const stats = state => mapStats(state.records);

export const recordsByDay = state => reduceByDay(state.records);
