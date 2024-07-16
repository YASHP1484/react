import axios from "axios";
import { setUserList } from "../Slice/userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserList = createAsyncThunk(
  "getUserList",
  async ({}, { dispatch }) => {
    console.log("axios.get ", axios.get);
    try {
      axios.get("http://localhost:8000/users").then((res) => {
        dispatch(setUserList(res.data));
      });
    } catch (err) {
      return err;
    }
  }
);
