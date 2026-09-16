const getHealth = async (req, res) => {
    return res.status(200).json({
        status: "OK",
        service: "Payment Service",
        lastTimeChecked: new Date().toISOString()
    });
};

module.exports = { getHealth };