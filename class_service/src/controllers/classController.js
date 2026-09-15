const { classSchema } = require('../schemas/classSchema');
const { createClass: createClassRepository } = require('../repositories/classRepository');

const createClass = async (req, res) => {
    try {
        const { error, value } = classSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ err: error.details[0].message });
        }

        const { name, schoolYear, monthlyFee } = value;
        const result = await createClassRepository(name, schoolYear, monthlyFee);

        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { createClass };