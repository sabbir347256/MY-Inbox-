import { useContext } from "react";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user, loading } = useContext(AuthProvider);

    const { data: role ='', isloading} = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () =>
            fetch(`https://assignment-12-server-site-pi.vercel.app/user/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    return data.role
                })
    })



    return [role, isloading];
};

export default useRole;