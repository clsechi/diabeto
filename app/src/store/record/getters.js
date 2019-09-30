const mapStats = (records) => {
  const size = records.length;

  return size;
};

export const records = state => state.records;

export const stats = state => mapStats(state.records);
