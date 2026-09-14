const config = require('../config/config');
const { services } = require('../config/config');

const getServiceHealth = async (serviceName, port) => {
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
    for (const service of services) {
        healths.push(await getServiceHealth(service.name, service.port));
    }
    res.status(200).json(healths);
};

module.exports = { getAllHealths };