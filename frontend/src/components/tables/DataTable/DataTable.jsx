import { useState } from 'react';
import { getUserFromToken } from '../../../utils/auth';
import './DataTable.css';

const isAdmin = () => {
    const user = getUserFromToken();
    return user?.role === "admin";
};

const formatDate = (date, key) => {
    if (key === "payment_date") {
        return new Date(date).toLocaleDateString('el-GR');
    } else {
        return new Date(date).toLocaleString('en-US');
    }
};

function DataTable({ columns, data, title, actions, handleExport, isHealthPage }) {
    const [sort, setSort] = useState(false);

    const displayedData = sort ?
        [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) :
        data;

    return (
        <div className="table-section">
            <div className="title-section">
                {title && <h2>{title}</h2>}
                {handleExport && <span key="export" className="material-symbols-outlined" onClick={handleExport}>download</span>}
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                        {isAdmin() && !isHealthPage &&
                            <th key="created_at">
                                Created at
                                <span className="material-symbols-outlined" style={{ position: "relative", top: "5px" }} onClick={() => setSort((current) => !current)}>
                                    {sort ? "arrow_downward" : "unfold_more"}
                                </span>
                            </th>
                        }
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {displayedData.map((item) => (
                        <tr key={`${item.id}-${item.service}`}>
                            {columns.map((column) => (
                                column.key === "payment_date" || column.key === "lastTimeChecked" || column.key === "created_at" ?
                                    <td key={column.key}>{formatDate(item[column.key], column.key)}</td> :
                                    column.key === "status" ?
                                        <td key={column.key} className={item[column.key] === "OK" ? "ok" : "down"}>{item[column.key]}</td> :
                                        <td key={column.key}>{item[column.key]}</td>
                            ))}
                            {isAdmin() && !isHealthPage && <td key="created_at">{formatDate(item.created_at, "created_at")}</td>}
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