import Vue from 'vue';

const userId = () => Vue.prototype.$firebase.auth().currentUser.uid;

const convertDate = ({ seconds }) => new Date(seconds * 1000);

export const createRecord = async ({ commit }, record) => {
  const createdAt = new Date();
  Object.assign(record, { createdAt, updatedAt: createdAt });

  const { id } = await Vue.prototype.$firestore
    .collection('users').doc(userId())
    .collection('records').add(record);

  Object.assign(record, { id });

  commit('createRecord', record);
};

export const updateRecord = async ({ commit }, record) => {
  const updatedAt = new Date();
  Object.assign(record, { updatedAt });

  await Vue.prototype.$firestore
    .collection('users').doc(userId())
    .collection('records').doc(record.id)
    .update(record);
  commit('updateRecord', record);
};


export const deleteRecord = async ({ commit }, id) => {
  await Vue.prototype.$firestore
    .collection('users').doc(userId())
    .collection('records').doc(id)
    .delete();
  commit('deleteRecord', id);
};

export const getRecords = async ({ commit }) => {
  // if (state.records.all.length > 0) return;

  const snapshot = await Vue.prototype.$firestore
    .collection('users').doc(userId())
    .collection('records')
    .orderBy('createdAt', 'desc')
    .get();
  const result = snapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.createdAt = convertDate(data.createdAt);
    data.updatedAt = convertDate(data.updatedAt);
    return data;
  });
  commit('setRecords', result);
};
