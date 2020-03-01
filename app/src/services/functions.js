import Vue from 'vue';

export const getAllRecords = async (userId, period) => {
  const { data } = await Vue.prototype.$axios.get(
    `https://us-central1-got-challenge.cloudfunctions.net/app/${userId}records?period=${period}`,
  );
  return data;
};

export const createAnswerBet = async (userId) => {
  const { data } = await Vue.prototype.$axios.get(
    `https://us-central1-got-challenge.cloudfunctions.net/app/${userId}`
  );
  return data;
};