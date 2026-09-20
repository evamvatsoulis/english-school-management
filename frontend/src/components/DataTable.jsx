import '../styles/components/DataTable.css';

const formatDate = (date) => new Date(date).toLocaleDateString('el-GR');

function DataTable({ columns, data, actions }) {
    return (
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
                    <tr key={item.id}>
                        {columns.map((column) => (
                            column.key === "payment_date" ?
                                <td key={column.key}>{formatDate(item[column.key])}</td> :
                                <td key={column.key}>{item[column.key]}</td>
                        ))}

                        {actions &&
                            <td className="actions">
                                {actions.map((action) => (
                                    <span className="material-symbols-outlined" onClick={() => action.function(item)}>{action.label}</span>
                                ))}
                            </td>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;