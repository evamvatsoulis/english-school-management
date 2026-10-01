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
        const result = await response.json();

        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: error.message });
    }
};

module.exports = { exportToPdf };