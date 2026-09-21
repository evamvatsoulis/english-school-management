import '../styles/components/Filter.css'

function Filter({ data, item, load }) {
    return (
        <div className="filter-section">
            <label htmlFor="item">Choose a {item}:</label>

            <select id="item" onChange={(event) => load(event.target.value)}>
                <option value="--" key={"--"}>--</option>
                {data.map((item) => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};
;
export default Filter;