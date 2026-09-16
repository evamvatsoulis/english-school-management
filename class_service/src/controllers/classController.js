const { classSchema, updateClassSchema } = require('../schemas/classSchema');
const {
    createClass: createClassRepository,
    getClasses: getClassesRepository,
    getClassById: getClassByIdRepository,
    updateClass: updateClassRepository,
    deactivateClass: deactivateClassRepository,
    activateClass: activateClassRepository
} = require('../repositories/classRepository');

const updateClassData = (value, className) => {
    const name = value.name ?? className.name;
    const schoolYear = value.schoolYear ?? className.school_year;

    return { name, schoolYear, monthlyFee };
};

const createClass = async (req, res) => {
    try {
        const { error, value } = classSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ err: error.details[0].message });
        }

        const { name, schoolYear } = value;
        const result = await createClassRepository(name, schoolYear);

        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to create class" });
    }
};

const getClasses = async (req, res) => {
    try {
        const result = await getClassesRepository();
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch classes" });
    }
};

const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getClassByIdRepository(id);

        if (!result) {
            return res.status(404).json({ error: "Class not found" });
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to get class" });
    }
};

const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = updateClassSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ err: error.details[0].message });
        }

        const currentClass = await getClassByIdRepository(id);

        if (!currentClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        const { name, schoolYear } = updateClassData(value, currentClass);
        const result = await updateClassRepository(name, schoolYear, id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to update class" });
    }
};

const deactivateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const currentClass = await getClassByIdRepository(id);

        if (!currentClass) {
            return res.status(404).json({ error: "Class not found" });
        }
        const result = await deactivateClassRepository(id);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to deactivate class" });
    }
};

const activateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const currentClass = await getClassByIdRepository(id);

        if (!currentClass) {
            return res.status(404).json({ error: "Class not found" });
        }
        const result = await activateClassRepository(id);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to activate class" });
    }
};

module.exports = { createClass, getClasses, getClassById, updateClass, deactivateClass, activateClass };