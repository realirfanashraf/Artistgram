const SuggestionBox = ({ users, loading ,listFinished}) => {
  return (
<div>
  {users.map(user => (
    <div className="user-card flex items-center space-x-2 p-2 mb-2 rounded-lg bg-gray-100" key={user.id}>
      <img src={user.ProfilePicture} alt={user.name} className="w-10 h-10 rounded-full" />
      <div>
        <p className="text-xs-bold">{user.name}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white   px-1 rounded">
          Follow
        </button>

      </div>
    </div>
  ))}
  {loading && <p>Loading...</p>}
  {listFinished && <p>finished</p>}
</div>

  );
};

export default SuggestionBox;
