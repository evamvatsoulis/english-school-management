import Sidebar from "../components/Sidebar";

function Dashboard() {
    return (
        <div className="page-layout">
            <Sidebar />
            
            <div className="page-content">
                <h1>Dashboard</h1>
            </div>
        </div>
    );
}

export default Dashboard;