import { useContext } from "react";
import { AuthProvider } from "../../../Authprovider/Authcontext";

const UserProfile = () => {
    const { user } = useContext(AuthProvider);
    return (
        <div className="text-center">
            <div className="flex justify-center">
                <img className="" src={user ? user.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt="" />
            </div>
            <h2>Name : {user?.displayName}</h2>
            <h2>Email : {user?.email}</h2>
            <h2>Badges : {} </h2>
        </div>
    );
};

export default UserProfile;