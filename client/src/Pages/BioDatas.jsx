import { useEffect, useState } from "react";
import UserCard from "../Components/UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen m-4">
      <h1 className="text-2xl lg:text-3xl mt-5 font-semibold font-serif text-center pb-4">
        All Users:
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
