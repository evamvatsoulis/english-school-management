const config = require('../config/config');
const { services } = require('../config/config');

const getUrlByServiceName = (serviceName) => {
    const service = Object.values(services).find(service => service.name === serviceName);
    if (service) {
        return `http://${service.host}:${service.port}`;
    }
};

const checkServiceHealth = async (serviceName, serviceUrl) => {
    try {
        const response = await fetch(`${serviceUrl}/health`, { signal: AbortSignal.timeout(5000) });
        return await response.json();
    } catch (error) {
        return {
            status: "DOWN",
            service: serviceName,
            lastTimeChecked: new Date().toISOString()
        };
    }
};

const getAllHealths = async (req, res) => {
    const healths = [];
    for (const service of Object.values(services)) {
        healths.push(await checkServiceHealth(service.name, `http://${service.host}:${service.port}`));
    }
    res.status(200).json(healths);
};

const getServiceHealth = async (req, res) => {
    const { serviceName } = req.params;
    const serviceUrl = getUrlByServiceName(serviceName);

    if (!serviceUrl) {
        return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(await checkServiceHealth(serviceName, serviceUrl));
};

module.exports = { getAllHealths, getServiceHealth };