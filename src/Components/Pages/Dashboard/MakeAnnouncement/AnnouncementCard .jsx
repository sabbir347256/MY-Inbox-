const AnnouncementCard = ({ photo,name,title, descrip ,data}) => {
  return (
    <div>
      {
        data?.length > 0 ?<div className="bg-white shadow-md rounded-lg p-6 mb-4 text-center">
        <img className="rounded-full w-32 mx-auto" src={photo} alt="" />
        <h2 className="text-xl font-semibold mb-2 py-2">Name : {name}</h2>
        <p className="text-gray-700"><span className="font-bold">Announcement Title</span> : {  title}</p>
        <p className="text-gray-700"><span className="font-bold">Announcement Description</span> :{  descrip}</p>
      </div>:<h2>Here is no announcement</h2>
      }
    </div>
  );
};

export default AnnouncementCard;
