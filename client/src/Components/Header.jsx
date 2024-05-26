import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ActiveLink from "./ActiveLink";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { signOutSuccess } from "../redux/user/userSlice";
import { AiOutlineSearch } from "react-icons/ai";


const Header = () => {
  
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

    const navBtn = (
      <ul className="md:flex md:gap-4 lg:gap-10 font-bold uppercase">
        <ActiveLink spy="true" smooth="true" to="/">
          <li>Home </li>
        </ActiveLink>

        <ActiveLink spy="true" smooth="true" to="/bios">
          <li>BioDatas</li>
        </ActiveLink>

        <ActiveLink spy="true" smooth="true" to="/about">
          <li>About Us</li>
        </ActiveLink>

        <ActiveLink spy="true" smooth="true" to="/contact">
          <li>Contact Us</li>
        </ActiveLink>
      </ul>
    );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  return (
    <Navbar
      fluid
      className="bg-gradient-to-r from-[#4c8e40] to-[#81b619] rounded-none"
    >
      <Link to="/">
        <h1 className="text-3xl font-serif text-white hidden md:inline">
          Shariya Marriage
        </h1>
        <h1 className="text-2xl font-serif text-white md:hidden">
          Shariya Marriage
        </h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="flex md:order-2 gap-4">
        <Button
          className=""
          color="none"
          pill
          onClick={() => dispatch(toggleTheme())}
          rounded
        >
          {theme === "light" ? <FaSun size={24} /> : <FaMoon size={24} />}
        </Button>
        {currentUser ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              {currentUser.isAdmin && (
                <Link to="/dashboard?tab=dash">
                  <Dropdown.Item as="div">Dashboard</Dropdown.Item>
                </Link>
              )}
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button
                  onClick={handleSignout}
                  outline
                  gradientDuoTone="greenToBlue"
                  className="text-xl font-semibold w-full"
                >
                  Sign Out
                </Button>
              </Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <Button
                outline
                gradientDuoTone="greenToBlue"
                className="font-semibold"
                size="sm"
              >
                Sign In
              </Button>
            </Link>
          </>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>{navBtn}</Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
