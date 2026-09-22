import { useState } from 'react';
import '../styles/components/form.css';

function ClassForm({ addClass, editClass, selectedClass, closeForm }) {
    const [name, setName] = useState(selectedClass ? selectedClass.name : "");
    const [schoolYear, setSchoolYear] = useState(selectedClass ? selectedClass.school_year : "");

    const handleSubmit = (event) => {
        event.preventDefault();
        selectedClass ?
            editClass({ name, schoolYear }) :
            addClass({ name, schoolYear });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-data">
                <div className="form-group">
                    <label htmlFor="level">Level:</label>
                    <input type="text" id="level" placeholder="Level" value={name} onChange={(event) => setName(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="school-year">School Year:</label>
                    <input type="text" id="school-year" placeholder="School Year" value={schoolYear} onChange={(event) => setSchoolYear(event.target.value)} />
                </div>
            </div>

            <div className="form-actions">
                <button className="form-save" type="submit">Save</button>
                <button type="button" className="form-cancel" onClick={closeForm}>Cancel</button>
            </div>
        </form>
    );
}

export default ClassForm;