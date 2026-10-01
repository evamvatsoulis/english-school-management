const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const path = require('path');
const fs = require('fs');

pdfMake.addVirtualFileSystem(pdfFonts);

const createTableBody = (columns, data) => {
    const tableBody = [columns.map((column) => ({ text: column, bold: true }))];

    data.map((row) => {
        const pdfRow = columns.map((column) => {
            const value = row[column];
            return value;
        });
        tableBody.push(pdfRow);
    });
    return tableBody;
};

const createDocDefinition = (tableName, columns, data) => {
    const docDefinition = {
        content: [
            {
                text: `${tableName}`,
                fontSize: 15,
                bold: true
            },
            {
                table: {
                    headerRows: 1,
                    body: createTableBody(columns, data)
                }
            }
        ]
    };
    return docDefinition;
};

const exportToPdf = async (req, res) => {
    const { tableName, columns, data } = req.body;

    try {
        const exportsPath = path.join(__dirname, "../../exports");
        const fileName = "test.pdf";

        const docDefinition = createDocDefinition(tableName, columns, data);
        var pdfDoc = pdfMake.createPdf(docDefinition);

        const buffer = await pdfDoc.getBuffer();
        fs.writeFileSync(path.join(exportsPath, fileName), buffer);

        return res.status(201).json({ message: "Pdf file created successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Failed to export to pdf" });
    }
};

module.exports = { exportToPdf };