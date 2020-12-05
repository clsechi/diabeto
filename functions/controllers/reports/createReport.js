const { getRecordsByPeriod } = require('../../services/recordsRepository');
const { generateFile } = require('../../services/pdfService');
const { uploadFile } = require('../../services/storageService');
const mapper = require('./mapper');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

const validateParams = (period, type) => {
  if (!period || !type) {
    throw new ValidationError('Invalid params');
  }
};

const getLink = async (user, period, type) => {
  validateParams(period, type);

  const records = await getRecordsByPeriod(user.id, period);

  const pdfData = mapper.toPdf(type, records);

  generateFile(pdfData);

  // const link = await uploadFile(pdfFile);

  return 'should be a link';
};

const createReports = async (req, res, next) => {
  const { period, type } = req.body;
  // const { user } = req;

  const user = {
    id: 'jDUezfnGAZPYVgF4yFLMucnixSC3',
  };

  try {
    const link = await getLink(user, period, type);

    return res.status(201).send({
      link,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: err.message,
      });
    }
    return next(err);
  }
};

module.exports = createReports;
