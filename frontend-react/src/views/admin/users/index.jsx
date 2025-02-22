import { useState, useEffect } from "react";
import SidebarMenu from "../../../components/SidebarMenu";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../../services/api";

export default function UsersIndex() {
    const [users, setUsers] = useState([]);

    const fetchDataUsers = async () => {
        const token = Cookies.get('token');

        if (!token) {
            console.error("Token is not available");
            return;
        }

        api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await api.get('/api/admin/users');
            console.log("Response from API:", response.data); // Debugging
            setUsers(response.data.data || []); // Sesuaikan dengan struktur respons
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };

    useEffect(() => {
        fetchDataUsers();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span>USERS</span>
                            <Link to="/admin/users/create" className="btn btn-sm btn-success">ADD USERS</Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col" style={{ width: "17%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td className="text-center">
                                                    <Link to={`/admin/users/edit/${user.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                    <button className="btn btn-sm btn-danger">DELETE</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                <div className="alert alert-danger mb-0">
                                                    Data tidak ada
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}