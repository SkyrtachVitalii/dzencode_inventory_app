import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionState } from "../../../types/sessions";

const initialState: SessionState = {
  sessionCount: 0,
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    selectActiveSessions(state, action: PayloadAction<number>) {
      state.sessionCount = action.payload;
    },
  },
});

export const { selectActiveSessions } = sessionsSlice.actions;
export default sessionsSlice.reducer;
