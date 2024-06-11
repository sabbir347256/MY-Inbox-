import { useQuery } from "@tanstack/react-query";
import AnnouncementCard from "./AnnouncementCard ";

const AnnouncementSection = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['GET'],
        queryFn: () => {
            return fetch('https://assignment-12-server-site-pi.vercel.app/announcement')
                .then(res => res.json())
                .then(data => {
                    return data
                })
        }
    });
    if (isLoading) {
        return <p className="text-red-600 text-center"><span className="loading loading-infinity loading-lg"></span></p>;
    }
    return (
        <div className="bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center mb-8">Announcements</h1>
                <div className="space-y-4">
                    {data.map((announcement, index) => (
                        <AnnouncementCard
                            key={index}
                            photo={announcement.imageurl}
                            name={announcement.title}
                            title={announcement.announceTitle}
                            descrip={announcement.descrip}
                            data = {data}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementSection;