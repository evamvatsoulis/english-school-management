import '../styles/components/select.css'

function Filter({ data, item, handleFilter }) {
    return (
        <div className="select-section">
            <label htmlFor="item">Sort by {item}:</label>

            <select id="item" onChange={(event) => handleFilter(event.target.value)}>
                <option value={"--"} key={"--"}>--</option>
                {data.map((item) => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;