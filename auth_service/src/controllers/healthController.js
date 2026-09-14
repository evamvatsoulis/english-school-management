const getHealth = async (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "Auth Service",
        lastTimeChecked: new Date().toISOString()
    });
};

module.exports = { getHealth };