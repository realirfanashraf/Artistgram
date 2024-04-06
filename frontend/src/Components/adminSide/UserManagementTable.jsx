import { useEffect, useState } from "react";
import { Axios } from "../../axios/adminInstance";
import { IoSearch } from "react-icons/io5";
import { showSuccessMessage, showErrorMessage } from "../../helper/sweetalert.js"

const UserManagementTable = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleBlockToggle = (userId) => {
        Axios.post(`/action/handleBlockUser/${userId}`)
            .then((response) => {
                setUsers(prevUsers => {
                    return prevUsers.map(user => {
                        if (user._id === userId) {
                            return { ...user, isBlocked: !user.isBlocked };
                        }
                        return user;
                    });
                });
                showSuccessMessage(response.data.message);
            })
            .catch((error) => {
                showErrorMessage(error.response.data.message);
            });
    };


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        Axios.get('/api/getUsersDetail')
            .then((response) => {
                const allUsers = response.data;
                if (value.trim() === "") {
                    setUsers(allUsers);
                } else {
                    const filteredUsers = allUsers.filter(user =>
                        user.name.toLowerCase().includes(value.toLowerCase())
                    );
                    setUsers(filteredUsers);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        Axios.get('/api/getUsersDetail')
            .then((response) => {
                setUsers(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="bg-gray-300 p-4 rounded-md mx-10 my-10">
            <div className='flex justify-center mb-4'>
                <div className="flex items-center rounded-md bg-gray-100 shadow-sm sm:px-2 sm:py-1" style={{ width: '50%' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-grow outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md px-2 py-1"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <div className="ml-1 p-1 rounded-md hover:bg-gray-200 focus:outline-none sm:h-8 sm:w-8" style={{ height: '24px' }}>
                        <IoSearch size={16} className="text-gray-500" />
                    </div>
                </div>
            </div>

            <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="tableHeading">
                            Name
                        </th>
                        <th className="tableHeading">
                            Email
                        </th>
                        <th className="tableHeading">
                            Date of Joining
                        </th>
                        <th className="tableHeading">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user, index) => (
                        <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm font-protest text-gray-900">{user.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 font-protest text-center">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 font-protest text-center">
                                    {user.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : "Date Joining Not Available"}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <button
                                    onClick={() => handleBlockToggle(user._id)}
                                    className={`px-4 py-2 ${user.isBlocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                        } text-sm font-medium rounded-md focus:outline-none`}
                                >
                                    {user.isBlocked ? 'Unblock' : 'Block'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default UserManagementTable;
