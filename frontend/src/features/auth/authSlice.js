import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupUser, emailVerificationFetch, loginUserFetch, refreshTokenFetch, logoutFetch } from "./authAPI";

export const emailVerification = createAsyncThunk(
  "user/emailVerification",
  async (emailVerify, { rejectWithValue }) => {
    try {
      const response = await emailVerificationFetch(emailVerify);
      console.log(response, "otp response");
      return response;
    } catch (error) {
      console.log(error, "error otp");
      return rejectWithValue(error);
    }
  }
);
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await signupUser(formData);
      return response;
    } catch (error) {
      console.log(error, "error register");

      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await loginUserFetch(loginData);
      console.log(response.data.token, "response for login");
      // Token is stored in httpOnly cookie, we only store access token in memory
      // Remove any old localStorage token

      return {
        token: response.data.token,
        user: response.data.user,
      };
    } catch (error) {
      console.log(error, "error login");
      return rejectWithValue(error);
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshTokenFetch();
      return {
        token: response.data.token,
        user: response.data.user,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutFetch();
      localStorage.removeItem("userToken");
      return null;
    } catch (error) {
      localStorage.removeItem("userToken");
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  userToken: null, 
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //registration
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Email verification
      .addCase(emailVerification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(emailVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(emailVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.userToken = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // refresh token
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.userToken = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(refreshUserToken.rejected, (state) => {
        state.userToken = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.userToken = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.userToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;

export const userSelector = (state) => state.auth;
export default authSlice.reducer;
