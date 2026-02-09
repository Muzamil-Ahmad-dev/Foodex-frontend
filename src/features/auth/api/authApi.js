 
export const registerUser = (data) =>
  api.post("/register", data);

export const loginUser = (data) =>
  api.post("/login", data);

export const fetchProfile = () =>
  api.get("/user/profile");

export const logoutUser = () =>
  api.post("/logout");
