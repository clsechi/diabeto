process.env.TZ = 'America/Sao_Paulo';

const moment = require('moment');

const COLUMNS_QUANTITY = 9;

const MAIN_CONFIG = {
  defaultStyle: {
    font: 'Helvetica',
  },
  pageSize: 'A4',
  pageOrientation: 'landscape',
};

const mapRecordsByDay = records => records.reduce((acc, record) => {
  // TODO better comparation
  const day = acc.find(ac => ac.date.toDateString() === record.time.toDateString());
  if (day) {
    day.records.push(record);
  } else {
    acc.push({
      date: record.time,
      records: [record],
    });
  }
  return acc;
}, []);


const getIndexByType = (type) => {
  const options = {
    breakfast: 1,
    after_breakfast: 2,
    lunch: 3,
    after_lunch: 4,
    dinner: 5,
    after_dinner: 6,
    before_sleep: 7,
    hipo: 8,
  };

  return options[type] || null;
};

const mapRecordsWithIndex = records => records.map((rec) => {
  const typeIndex = getIndexByType(rec.type);
  return {
    ...rec,
    typeIndex,
  };
});

const mapLine = (day) => {
  const line = [...new Array(COLUMNS_QUANTITY)];

  const recordsWithIndex = mapRecordsWithIndex(day.records);

  return line.map((column, index) => {
    if (index === 0) return moment(day.date).format('DD/MM/YY');

    const record = recordsWithIndex.find(rec => rec.typeIndex === index);
    return record && record.dextro ? record.dextro : '';
  });
};

const mapLines = recordsByDay => recordsByDay.map(day => mapLine(day));

const tableHeaders = () => {
  const labels = [
    'Data',
    'Jejum',
    '2h após café',
    'Almoço',
    '2h após almoço',
    'Jantar',
    '2h após jantar',
    'Antes de deitar',
    'Hipoglicemia',
  ];

  return labels.map(label => ({
    text: label,
    bold: true,
  }));
};

const mapTable = (recordsByDay) => {
  const lines = mapLines(recordsByDay);
  const headers = tableHeaders();

  const table = {
    table: {
      headerRows: 1,
      widths: '*',
      body: [
        headers,
        ...lines,
      ],
    },
  };

  return table;
};

const mapContent = (table, userName) => {
  const createdAt = moment().format('DD/MM/YYYY hh:mm');

  const content = [
    { text: `Paciente: ${userName}`, fontSize: 12 },
    ' ',
    { text: `Criado em: ${createdAt}`, fontSize: 12 },
    ' ',
    { text: 'Controle de Dextro', fontSize: 15, bold: true },
    ' ',
    table,
  ];

  return content;
};


const mapper = (records) => {
  const recordsByDay = mapRecordsByDay(records);

  const table = mapTable(recordsByDay);

  const content = mapContent(table, 'Carlos Lima Sechi');

  return ({
    ...MAIN_CONFIG,
    content,
  });
};

module.exports = mapper;
