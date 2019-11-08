import Vue from 'vue';

export const createRecord = (state, data) => {
  state.records.unshift(data);
};

export const updateRecord = (state, data) => {
  const index = state.records.findIndex(rec => rec.id === data.id);
  const record = state.records[index];
  Vue.set(state.records, index, Object.assign({}, record, data));
};

export const setRecords = (state, data) => {
  state.records = data;
};

export const deleteRecord = (state, data) => {
  state.records = state.records.filter(record => record.id !== data);
};
