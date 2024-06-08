import { useEffect, useState } from "react";
import SetAllCOmment from "./ShowAllComment/SetAllCOmment";

const ShowAllComment = () => {
    const [allComment, setAllComment] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/comment')
            .then(res => res.json())
            .then(data => setAllComment(data))
    }, [])

    return (
        <div>
            {
                allComment.map(c => <SetAllCOmment key={c._id} c={c} ></SetAllCOmment>)
            }
        </div>
    );
};

export default ShowAllComment;