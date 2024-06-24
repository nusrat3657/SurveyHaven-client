import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUser, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

const AllUsers = () => {
    const [filteredUser, setFilteredUser] = useState([]);
    const [role, setRole] = useState('');
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    // console.log(users);

    useEffect(() => {
        let filtered = users;


        if (role) {
            filtered = filtered.filter(user => user.role === role);
        }

        setFilteredUser(filtered);
    }, [role, users]);


    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleMakeSurveyor = user => {
        axiosSecure.patch(`/users/surveyor/${user._id}`)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Surveyor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your added food has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

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
                    {/* head */}
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
                        {
                            filteredUser.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <div className='flex'>
                                    <td>
                                        {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className='btn btn-ghost btn-md'>
                                            <FaUsers className='text-blue-400'></FaUsers>
                                        </button>}
                                        {user.role === 'surveyor' ? 'Surveyor' : <button onClick={() => handleMakeSurveyor(user)} className='btn btn-ghost btn-md'>
                                            <FaUser className='text-blue-400'></FaUser>
                                        </button>}
                                    </td>
                                </div>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className='btn btn-ghost btn-md'>
                                        <FaTrashAlt className='text-red-600'></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;