import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api/axiosInstance";
import { ConversationState } from "../../utils/interfaces";

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  error: null,
};

export const fetchUserConversations = createAsyncThunk(
  "conversations/fetchUserConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/conversations/getUserConversation"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default conversationSlice.reducer;
