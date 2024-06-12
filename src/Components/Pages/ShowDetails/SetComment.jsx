const SetComment = ({c}) => {
    const {name,email,comment} = c;
    return (
        <div>
            <h2 className="text-xl font-semibold text-black">{name}</h2>
            <h2 className="text-black">{comment}</h2>
        </div>
    );
};

export default SetComment;