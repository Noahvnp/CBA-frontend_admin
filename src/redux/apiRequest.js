import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logOutFailure,
  logOutStart,
  logOutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";

export const 
loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate.push("/admin/default");
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/auth/register", user);
    dispatch(registerSuccess());
    navigate.push("/auth/sign-in");
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("/user/", {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/user/" + id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailure(err.response.data));
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("/auth/logout", id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(logOutSuccess());
    navigate("/");
  } catch (err) {
    dispatch(logOutFailure());
  }
};

export const sendMail = async(user, navigate, axiosJWT) => {
  try {
    await axios.post("/sendmail", user);
    navigate("/");
  } catch (err) {
    console.log(err);
  }
}