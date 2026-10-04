const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const { logoBase64 } = require('../utils/base64');

pdfMake.addVirtualFileSystem(pdfFonts);

const formatDate = (date) => new Date(date).toLocaleDateString('el-GR');

const replaceHyphensWithSpaces = (item) => item.split('-').join(' ');

const createTableBody = (columns, data) => {
    const tableColumns = columns.map((column) => column.label);

    const tableBody = [tableColumns.map((column) => ({ text: column, bold: true, alignment: 'center' }))];

    data.map((row) => {
        const pdfRow = columns.map((column) => {
            let value = row[column.key];

            if (column.key === "payment_date") {
                value = formatDate(row[column.key]);
            }

            return value !== null && value !== undefined ? value.toString() : '';
        });
        tableBody.push(pdfRow);
    });
    return tableBody;
};

const createDocDefinition = (tableName, columns, data) => {
    const title = replaceHyphensWithSpaces(tableName);
    const docDefinition = {
        header: {
            text: 'Date: ' + formatDate(new Date()),
            alignment: 'right',
            margin: [0, 10, 5, 0]
        },
        content: [
            {
                image: logoBase64,
                width: 100,
                height: 100,
                alignment: 'center'
            },
            {
                text: title,
                fontSize: 15,
                bold: true,
                alignment: 'center',
                margin: [0, 20, 0, 0]
            },
            {
                columns: [
                    { width: '*', text: '' },
                    {
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            body: createTableBody(columns, data)
                        }
                    },
                    { width: '*', text: '' }
                ],
                margin: [0, 10, 0, 0]
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