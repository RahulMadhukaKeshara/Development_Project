const handlePdfExport = async () => {
  setLoading(true);
  await html2canvas(document.getElementById(tableId)).then(canvas => {
      const data = canvas.toDataURL();
      const pdfExportSetting = {
          content: [
              {
                  image: data,
                  width: 500,
              },
          ],
      };
      pdfMake.createPdf(pdfExportSetting).download(`${fileName}-${moment().format('DD-MM-YYYY')}.pdf`);
  });
  setLoading(false);
  handleClose();
};