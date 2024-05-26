import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiArrowNarrowUp, HiDocumentText } from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashboardComponent() {
  const [users, setUsers] = useState([]);
  const [marriages, setMarriages] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalMarriages, setTotalMarriages] = useState([]);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthMarriages, setLastMonthMarriages] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchMarriages = async () => {
      try {
        const res = await fetch(`/api/marriage/getMarriages?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setMarriages(data.marriages);
          setTotalMarriages(data.totalMarriages);
          setLastMonthMarriages(data.lastMonthMarriage);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchMarriages();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 lg:w-72 md:w-60 w-full rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
              <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                  <HiArrowNarrowUp /> {lastMonthUsers}
                </span>
                <div className="text-gray-500">Last month</div>
              </div>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-7xl p-3 shadow-lg" />
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 lg:w-72 md:w-60 w-full rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Marriages</h3>
              <p className="text-2xl">{totalMarriages}</p>
              <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                  <HiArrowNarrowUp /> {lastMonthMarriages}
                </span>
                <div className="text-gray-500">Last month</div>
              </div>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-7xl p-3 shadow-lg" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center py-3 mx-auto">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone="greenToBlue" size="sm">
              <Link to={"/dashboard?tab=users"}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Marriages</h1>
            <Button outline gradientDuoTone="greenToBlue" size="sm">
              <Link to={"/dashboard?tab=marriages"}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Marriage Image</Table.HeadCell>
              <Table.HeadCell>Marriage Title</Table.HeadCell>
              <Table.HeadCell>Marriage Category</Table.HeadCell>
            </Table.Head>
            {marriages &&
              marriages.map((marriage) => (
                <Table.Body key={marriage._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={marriage.image}
                        alt="marriage"
                        className="w-20 h-10 bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{marriage.title}</p>
                    </Table.Cell>
                    <Table.Cell className="w-5">{marriage.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
