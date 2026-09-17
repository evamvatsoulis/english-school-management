const config = require('../config/config');
const { services } = require('../config/config');

const getPortByServiceName = (serviceName) => {
    const service = Object.values(services).find(service => service.name === serviceName);
    if (service) {
        return service.port;
    }
};

const checkServiceHealth = async (serviceName, port) => {
    try {
        const response = await fetch(`http://${config.host}:${port}/health`);
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
        healths.push(await checkServiceHealth(service.name, service.port));
    }
    res.status(200).json(healths);
};

const getServiceHealth = async (req, res) => {
    const { serviceName } = req.params;
    const servicePort = getPortByServiceName(serviceName);

    if (!servicePort) {
        return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(await checkServiceHealth(serviceName, servicePort));
};

module.exports = { getAllHealths, getServiceHealth };