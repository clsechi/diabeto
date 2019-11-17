import Vue from 'vue';
import { date } from 'quasar';

const { subtractFromDate } = date;

const userId = () => Vue.prototype.$firebase.auth().currentUser.uid;

const convertDate = ({ seconds }) => new Date(seconds * 1000);

const stringToDate = (raw) => {
  const [time, formatedDate] = raw.split(' ');
  const [day, month, year] = formatedDate.split('/');
  const [hour, minutes] = time.split(':');
  return new Date(`20${year}`, month - 1, day, hour, minutes);
};

const mapPeriod = (period) => {
  if (!period) return new Date('2000');
  return subtractFromDate(new Date(), { days: period });
};

export const createRecord = async ({ commit }, record) => {
  const createdAt = new Date();
  const time = stringToDate(record.time);
  const mapedRecord = Object.assign({}, record, { createdAt, updatedAt: createdAt, time });

  const { id } = await Vue.prototype.$firestore
    .collection('users').doc(userId())
    .collection('records').add(mapedRecord);

  commit('createRecord', Object.assign({}, mapedRecord, { id }));
};

export const updateRecord = async ({ commit }, record) => {
  const updatedAt = new Date();
  const time = stringToDate(record.time);
  const mapedRecord = Object.assign({}, record, { updatedAt, time });

  await Vue.prototype.$firestore
    .collection('users').doc(userId())
    .collection('records').doc(mapedRecord.id)
    .update(mapedRecord);

  commit('updateRecord', mapedRecord);
};

export const deleteRecord = async ({ commit }, id) => {
  await Vue.prototype.$firestore
    .collection('users').doc(userId())
    .collection('records').doc(id)
    .delete();
  commit('deleteRecord', id);
};

export const getRecords = async ({ state, commit }) => {
  const snapshot = await Vue.prototype.$firestore
    .collection('users').doc(userId())
    .collection('records')
    .where('time', '>=', mapPeriod(state.period))
    .orderBy('time', 'desc')
    .get();

  const result = snapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.createdAt = convertDate(data.createdAt);
    data.updatedAt = convertDate(data.updatedAt);
    data.time = convertDate(data.time);
    return data;
  });
  commit('setRecords', result);
};
