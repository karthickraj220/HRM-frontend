import AdminDashboardContent from "./AdminDashboardContent"; 
import TopNavbar from "../../components/Navbar";

const AdminDashboard = () => {
    return (
        <div className="flex-grow-1">
            <TopNavbar />
            <AdminDashboardContent />
        </div>
    );
};

export default AdminDashboard;
