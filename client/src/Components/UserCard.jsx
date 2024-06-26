import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-96 overflow-hidden rounded-lg sm:w-80 transition-all">
      <Link to={`/user/${user.username}`}>
        <img
          src={user.profilePicture}
          alt={`${user.name}'s profile`}
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{user.name}</p>
        <Link
          to={`/user/${user.username}`}
          className="z-10 group-hover:bottom-2 absolute bottom-[-200px] w-[calc(100%-1rem)] left-1/2 transform -translate-x-1/2 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none font-semibold"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
