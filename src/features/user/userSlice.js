import { createSlice } from "@reduxjs/toolkit";

const themes = {
  winter: "winter",
  dracula: "dark",
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const initialState = {
  user: null,
  isAdmin: false,
  onlineUsers: [],
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      if (action.payload.role.toString() == "admin") {
        state.isAdmin = true;
      }

      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.isAdmin = false;
      state.user = null;
      localStorage.removeItem('user');
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    toggleTheme: (state, action) => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula ? winter : dracula;

      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme, setOnlineUsers } =
  userSlice.actions;

export default userSlice.reducer;
