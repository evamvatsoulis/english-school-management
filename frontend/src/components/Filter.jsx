import '../styles/components/Filter.css'

function Filter({ data, item, load }) {
    return (
        <div>
            <label htmlFor="item">Choose a {item}:</label>

            <select id="item" name="item" className="filter-select" onChange={(event) => load(event.target.value)}>
                <option className="filter-option" value="--">--</option>
                {data.map((item) => (
                    <option className="filter-option" value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};
;
export default Filter;