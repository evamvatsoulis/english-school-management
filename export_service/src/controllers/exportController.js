const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const path = require('path');
const fs = require('fs');

pdfMake.addVirtualFileSystem(pdfFonts);

const formatDate = (date) => new Date(date).toLocaleDateString('el-GR');

const createTableBody = (columns, data) => {
    const tableBody = [columns.map((column) => ({ text: column, bold: true }))];

    data.map((row) => {
        const pdfRow = columns.map((column) => {
            let value = row[column];

            if (column === "payment_date") {
                value = formatDate(row[column]);
            }

            return value !== null && value !== undefined ? value.toString() : '';
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
    const { tableName, columns, tableData } = req.body;

    try {
        const docDefinition = createDocDefinition(tableName, columns, tableData);
        var pdfDoc = pdfMake.createPdf(docDefinition);

        const buffer = await pdfDoc.getBuffer();

        res.setHeader('Content-Type', 'application/pdf');

        return res.status(200).send(buffer);
    } catch (err) {
        return res.status(500).json({ error: "Failed to export to pdf" });
    }
};

module.exports = { exportToPdf };