import './Select.css';

function Select({ data, item, handleSelect }) {
    return (
        <div className="select-section">
            <label htmlFor={item}>Select {item}:</label>

            <select id={item} onChange={(event) => handleSelect(event.target.value)}>
                <option value="--" key="--">--</option>
                {data.map((dataItem) => (
                    <option value={dataItem.id} key={dataItem.id}>{dataItem.first_name} {dataItem.last_name}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;