const { classSchema } = require('../schemas/classSchema');
const {
    createClass: createClassRepository,
    getClasses: getClassesRepository,
    getClass: getClassRepository
} = require('../repositories/classRepository');

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

const getClasses = async (req, res) => {
    try {
        const result = await getClassesRepository();
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getClass = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getClassRepository(id);

        if (!result) {
            return res.status(404).json({ error: "Class not found" });
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { createClass, getClasses, getClass };