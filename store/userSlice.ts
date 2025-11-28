import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any | null;
  loading: boolean;
  authChecked: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  authChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any | null>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.authChecked = action.payload;
    },
    resetUser(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, setAuthChecked, resetUser } =
  userSlice.actions;
export default userSlice.reducer;

