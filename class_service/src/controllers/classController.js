const { classSchema, updateClassSchema } = require('../schemas/classSchema');
const {
    createClass: createClassRepository,
    getClasses: getClassesRepository,
    getClassById: getClassByIdRepository,
    updateClass: updateClassRepository,
    deactivateClass: deactivateClassRepository,
    activateClass: activateClassRepository,
    getClassByNameAndYear
} = require('../repositories/classRepository');

const notFound = (result) => result.length === 0;

const doesNotExist = async (id) => {
    const result = await getClassByIdRepository(id);
    return !result;
};

const alreadyExists = async (currentName, currentSchoolYear, name, schoolYear) => {
    if (currentName !== name && currentSchoolYear !== schoolYear) {
        const result = await getClassByNameAndYear(name, schoolYear);
        return result;
    }
    return false;
};

const updateClassData = (value, className) => {
    const name = value.name ?? className.name;
    const schoolYear = value.schoolYear ?? className.school_year;

    return { name, schoolYear };
};

const createClass = async (req, res) => {
    try {
        const { error, value } = classSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, schoolYear } = value;

        if (await alreadyExists(null, null, name, schoolYear)) {
            return res.status(400).json({ error: "Class already exists" });
        }

        const result = await createClassRepository(name, schoolYear);

        return res.status(201).json({ message: "Class added", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to create class" });
    }
};

const getClasses = async (req, res) => {
    try {
        const result = await getClassesRepository();

        if (notFound(result)) {
            return res.status(200).json({ message: "There are no classes", result: [] });
        }

        return res.status(200).json({ message: "Classes loaded successfully", result });
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
        return res.status(200).json({ message: "Class loaded successfully", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to get class" });
    }
};

const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = updateClassSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const currentClass = await getClassByIdRepository(id);

        if (!currentClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        if (await alreadyExists(currentClass.name, currentClass.schoolYear, value.name, value.schoolYear)) {
            return res.status(400).json({ error: "Class already exists" });
        }

        const { name, schoolYear } = updateClassData(value, currentClass);
        const result = await updateClassRepository(name, schoolYear, id);

        return res.status(200).json({ message: "Class edited", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to update class" });
    }
};

const deactivateClass = async (req, res) => {
    try {
        const { id } = req.params;

        if (await doesNotExist(id)) {
            return res.status(404).json({ error: "Class not found" });
        }

        const result = await deactivateClassRepository(id);
        return res.status(200).json({ message: "Class deleted", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to deactivate class" });
    }
};

module.exports = { createClass, getClasses, getClassById, updateClass, deactivateClass };