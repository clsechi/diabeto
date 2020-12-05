const PdfPrinter = require('pdfmake');
const fs = require('fs');

const AVAILABLE_FONTS = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
};

// TODO generate blob
const generateFile = (pdfData) => {
  const printer = new PdfPrinter(AVAILABLE_FONTS);

  const pdfDoc = printer.createPdfKitDocument(pdfData);
  pdfDoc.pipe(fs.createWriteStream('document.pdf'));
  pdfDoc.end();
};

module.exports = {
  generateFile,
};
