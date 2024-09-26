const xlsx = require("xlsx");

const chatImport = async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const charts = jsonData.map((row) => {
      return {
        message: row["Message"],
        sender: row["Sender"],
      };
    });

    res.json(charts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process the uploaded file" });
  }
};

module.exports = chatImport;
