const SetComment = ({c}) => {
    const {name,email,comment} = c;
    return (
        <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <h2>{comment}</h2>
        </div>
    );
};

export default SetComment;