import AdminDashboardContent from "./AdminDashboardContent"; // your existing dashboard content
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
