const config = require('../config/config');

const exportServiceUrl = `http://${config.services.export.host}:${config.services.export.port}`;

const exportToPdf = async (req, res) => {
    try {
        const response = await fetch(`${exportServiceUrl}/export/pdf`,
            {
                signal: AbortSignal.timeout(5000),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req.body)
            }
        );

        const contentType = response.headers.get('content-type');
        const body = Buffer.from(await response.arrayBuffer());

        if (contentType) {
            res.setHeader('Content-Type', contentType);
        }

        return res.status(response.status).send(body);
    } catch (error) {
        return res.status(503).json({ error: "Export service is currently unavailable" });
    }
};

module.exports = { exportToPdf };