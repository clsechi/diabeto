import Vue from 'vue';
import { date } from 'quasar';

import { getAllRecords } from 'src/services/functions';

const { subtractFromDate } = date;

const getUserId = () => Vue.prototype.$firebase.auth().currentUser.uid;

const convertDate = ({ seconds }) => new Date(seconds * 1000);

const stringToDate = (raw) => {
  const [time, formatedDate] = raw.split(' ');
  const [day, month, year] = formatedDate.split('/');
  const [hour, minutes] = time.split(':');
  return new Date(`20${year}`, month - 1, day, hour, minutes);
};

const mapPeriod = (period) => {
  if (!period) return new Date('2000');
  return subtractFromDate(new Date(), { days: period }); // TODO do not user hours
};

export const createRecord = async ({ commit }, record) => {
  const createdAt = new Date();
  const time = stringToDate(record.time);
  const mapedRecord = Object.assign({}, record, { createdAt, updatedAt: createdAt, time });

  const { id } = await Vue.prototype.$firestore
    .collection('users').doc(getUserId())
    .collection('records').add(mapedRecord);

  commit('createRecord', Object.assign({}, mapedRecord, { id }));
};

/**
 * Remove createdAt from object, because this value is not editable
 * @param {object} record A record object with the values to update
 */
export const updateRecord = async ({ commit }, record) => {
  delete record.createdAt;

  const updatedAt = new Date();
  const time = stringToDate(record.time);
  const mapedRecord = Object.assign({}, record, { updatedAt, time });

  await Vue.prototype.$firestore
    .collection('users').doc(getUserId())
    .collection('records').doc(mapedRecord.id)
    .update(mapedRecord);

  commit('updateRecord', mapedRecord);
};

export const deleteRecord = async ({ commit }, id) => {
  await Vue.prototype.$firestore
    .collection('users').doc(getUserId())
    .collection('records').doc(id)
    .delete();
  commit('deleteRecord', id);
};

const getFirestoreRecords = (period) => {
  const snapshot = await Vue.prototype.$firestore
    .collection('users').doc(getUserId())
    .collection('records')
    .where('time', '>=', mapPeriod(period))
    .orderBy('time', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.createdAt = convertDate(data.createdAt);
    data.updatedAt = convertDate(data.updatedAt);
    data.time = convertDate(data.time);
    return data;
  });
};

const getFunctionsRecords = async (userId, period) => {
  const { data } = getAllRecords(userId, period);
  return data;
};

export const getRecords = async ({ state, commit }) => {
  let result;
  const { period } = state;

  if (tokenAccess) {
    result = await getFunctionsRecords(userId, period);
  } else {
    result = await getFirestoreRecords(period)
  }
  commit('setRecords', result);
};
