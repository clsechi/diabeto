const deiseDutraMapper = require('./pdf/deiseDutra');

const mappers = {
  deise_dutra: deiseDutraMapper,
};

const toPdf = (type, records) => {
  const mapper = mappers[type];
  return mapper(records);
};

module.exports = {
  toPdf,
};
