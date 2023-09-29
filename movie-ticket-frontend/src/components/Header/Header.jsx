import {
  AppBar,
  Box,
  Toolbar,
  Autocomplete,
  TextField,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import TheaterComedySharpIcon from "@mui/icons-material/TheaterComedySharp";
import { Link, NavLink } from "react-router-dom";
import { getAllMovies } from "../../api-helpers/api-helpers";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store";
import { adminActions } from "../../store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState([]);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState("");

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e, val) => {
    setSelectedMovie(val);
    const movie = data.find((mov) => mov.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/bookings/${movie._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width="20%">
          <Link to="/" style={{ color: "white" }}>
            <TheaterComedySharpIcon />
          </Link>
        </Box>
        <Box width="60%" marginRight={"auto"} marginLeft="auto">
          <Autocomplete
            onChange={handleChange}
            sx={{ borderRadius: 10, width: "40%", margin: "auto" }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={data.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  borderRadius: 2,
                  input: { color: "white" },
                  bgcolor: "#2b2d42",
                  padding: "6px",
                }}
                variant="standard"
                placeholder="Search Across Multiple Movies"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box>
        <Box display="flex">
          <Tabs
            onChange={(e, val) => setValue(val)}
            value={value}
            textColor="inherit"
          >
            <Tab
              key="movies"
              LinkComponent={Link}
              to="/movies"
              label="Movies"
            />
            {!isAdminLoggedIn &&
              !isUserLoggedIn && [
                <Tab
                  key="auth"
                  LinkComponent={NavLink}
                  to="/auth"
                  label="Auth"
                />,
                <Tab
                  key="admin"
                  LinkComponent={NavLink}
                  to="/admin"
                  label="Admin"
                />,
              ]}

            {isUserLoggedIn && [
              <Tab key="user" LinkComponent={Link} to="/user" label="User" />,
              <Tab
                key="user-logout"
                onClick={() => dispatch(userActions.logout())}
                LinkComponent={Link}
                to="/"
                label="Logout"
              />,
            ]}

            {isAdminLoggedIn && [
              <Tab
                key="profile"
                LinkComponent={Link}
                to="/profile"
                label="Profile"
              />,
              <Tab
                key="add-movie"
                LinkComponent={Link}
                to="/add"
                label="Add Movie"
              />,
              <Tab
                key="admin-logout"
                onClick={() => dispatch(adminActions.logout())}
                LinkComponent={Link}
                to="/"
                label="Logout"
              />,
            ]}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
