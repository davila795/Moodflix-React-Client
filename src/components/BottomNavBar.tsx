import React, {useEffect, useState} from 'react';
import {BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';
import {FaHome, FaUser, FaRegUser, FaFilm, FaHistory} from 'react-icons/fa';
import {MOBILEBAR_HEIGHT} from "../constants/constants.ts";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

function BottomNavBar() {
  const [value, setValue] = useState(0); // State to track the selected tab
  const userName = useSelector((state: RootState) => state.user.userName);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") setValue(0);
    else if (location.pathname === "/movies") setValue(1);
    else if (location.pathname === "/history") setValue(2);
    else if (location.pathname === "/profile" || location.pathname === "/login") setValue(3);
  }, [location.pathname]);

  const handleNavigation = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) navigate("/");
    if (newValue === 1) navigate("/movies");
    if (newValue === 2) navigate("/history");
    if (newValue === 3) navigate(userName ? "/profile" : "/login");
  }
  return (
    <Paper
      sx={{position: 'fixed', bottom: 0, left: 0, right: 0, height: MOBILEBAR_HEIGHT,}}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigation}

      >
        {/* Home */}
        <BottomNavigationAction
          label="Home"
          icon={<FaHome/>}
        />

        {/* Movie Recommendation */}
        <BottomNavigationAction
          label="Movies"
          icon={<FaFilm/>}
        />

        {/* History */}
        <BottomNavigationAction
          label="History"
          icon={<FaHistory/>}
        />

        {/* Login/Profile */}
        {userName ?
          <BottomNavigationAction
            label={userName}
            icon={<FaUser/>}
          />
          :
          <BottomNavigationAction
            label={"Login"}
            icon={<FaRegUser/>}
          />
        }
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNavBar;

