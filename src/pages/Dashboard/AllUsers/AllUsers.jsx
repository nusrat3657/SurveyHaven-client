import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUser, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

const AllUsers = () => {
    const [filteredUser, setFilteredUser] = useState([]);
    const [role, setRole] = useState('');
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    useEffect(() => {
        let filtered = users;
        if (role) {
            filtered = filtered.filter(user => user.role === role);
        }
        setFilteredUser(filtered);
    }, [role, users]);

    const handleMakeAdmin = async (user) => {
        try {
            const res = await axiosSecure.patch(`/users/admin/${user._id}`);
            if (res?.data?.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error making admin:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to make admin',
                text: error.response?.data?.message || 'Unknown error',
                showConfirmButton: true,
            });
        }
    };

    const handleMakeSurveyor = async (user) => {
        try {
            const res = await axiosSecure.patch(`/users/surveyor/${user._id}`);
            if (res?.data?.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is a Surveyor Now!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error making surveyor:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to make surveyor',
                text: error.response?.data?.message || 'Unknown error',
                showConfirmButton: true,
            });
        }
    };

    const handleDeleteUser = async (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/users/${user._id}`);
                    if (res?.data?.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'The user has been deleted.',
                            icon: 'success',
                        });
                    }
                } catch (error) {
                    console.error('Error deleting user:', error);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Failed to delete user',
                        text: error.response?.data?.message || 'Unknown error',
                        showConfirmButton: true,
                    });
                }
            }
        });
    };

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
                <label className="flex items-center">
                    <h2 className="font-bold">Role:</h2>
                    <select className="select select-bordered w-full max-w-xs" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">All</option>
                        <option value="surveyor">Surveyor</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="pro-user">Pro-User</option>
                    </select>
                </label>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUser.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="flex space-x-2">
                                        {user.role === 'admin' ? 'Admin' : (
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-md">
                                                <FaUsers className="text-blue-400" />
                                            </button>
                                        )}
                                        {user.role === 'surveyor' ? 'Surveyor' : (
                                            <button onClick={() => handleMakeSurveyor(user)} className="btn btn-ghost btn-md">
                                                <FaUser className="text-blue-400" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-md">
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
