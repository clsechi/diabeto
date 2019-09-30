export const createRecord = (state, data) => {
  state.records.push(data);
};

export const updateRecord = (state, data) => {
  const recordIndex = state.records.findIndex(rec => rec.id === data.id);
  state.records[recordIndex] = data;
};

export const setRecords = (state, data) => {
  state.records = data;
};

export const deleteRecord = (state, data) => {
  state.records = state.records.filter(record => record.id !== data);
};
