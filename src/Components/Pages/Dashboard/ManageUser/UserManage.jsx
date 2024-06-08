import { useEffect, useState } from "react";
import UserDataRow from "./UserDataRow ";

const UserManage = () => {
    const [manageUsers, setManageUser] = useState([]);

    useEffect(() => {
        fetch('https://assignment-12-server-site-pi.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                setManageUser(data)
            })
    }, [])


    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                                    >
                                        Status
                                    </th>

                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    manageUsers.map(user => <UserDataRow key={user._id} user={user}></UserDataRow>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManage;