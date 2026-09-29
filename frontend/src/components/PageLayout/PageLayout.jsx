import Sidebar from '../Sidebar/Sidebar';
import './PageLayout.css';

function PageLayout({ children }) {
    return (
        <div className="page-layout">
            <Sidebar />

            <div className="page-content">
                {children}
            </div>
        </div>
    );
}

export default PageLayout;