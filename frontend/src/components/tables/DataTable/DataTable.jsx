import './DataTable.css';

const formatDate = (date, key) => {
    if (key === "payment_date") {
        return new Date(date).toLocaleDateString('el-GR');
    } else {
        return new Date(date).toLocaleString('el-GR');
    }
}

function DataTable({ columns, data, title, actions }) {
    return (
        <div className="table-section">
            {title && <h2>{title}</h2>}

            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={`${item.id}-${item.service}`}>
                            {columns.map((column) => (
                                column.key === "payment_date" || column.key === "lastTimeChecked" ?
                                    <td key={column.key}>{formatDate(item[column.key], column.key)}</td> :
                                    column.key === "status" ?
                                        <td key={column.key} className={item[column.key] === "OK" ? "ok" : "down"}>{item[column.key]}</td> :
                                        <td key={column.key}>{item[column.key]}</td>
                            ))}

                            {actions &&
                                <td className="actions">
                                    {actions.map((action) => (
                                        <span key={action.label} className="material-symbols-outlined" onClick={() => action.function(item)}>{action.label}</span>
                                    ))}
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;