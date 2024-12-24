import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get(
      "https://redux-app-backend.vercel.app/teachers"
    );
    console.log(response.data);
    return response.data;
  }
);

// Delete teacher
export const deleteTeacher = createAsyncThunk(
  "Teacher/deleteTeacher",
  async (teacherId) => {
    const response = await axios.delete(
      `https://redux-app-backend.vercel.app/teachers/${teacherId}`
    );
    return response.data;
  }
);

// Add a new teacher
export const addNewTeacher = createAsyncThunk(
  "post/addNewTeacher",
  async (newTeacherData) => {
    const response = await axios.post(
      "https://redux-app-backend.vercel.app/teachers",
      newTeacherData
    );
    return response.data;
  }
);

// Update a  teacher
export const updateTeacher = createAsyncThunk(
  "put/updateTeacher",
  async ({ teacherId, updatedTeachersData }) => {
    const response = await axios.put(
      `https://redux-app-backend.vercel.app/teachers/${teacherId}`,
      updatedTeachersData
    );
    return response.data
  }
);

export const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "success";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Delete teacher
    builder.addCase(deleteTeacher.pending, (state) => {
      state.status = "loading...";
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.status = "Successfully Deleted";
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload
      );
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // Add new teacher
    builder.addCase(addNewTeacher.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewTeacher.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers.push(action.payload);
    });
    builder.addCase(addNewTeacher.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //update Teacher
    builder.addCase(updateTeacher.pending, (state) => {
      state.status = "updating";
    });
    builder.addCase(updateTeacher.fulfilled, (state, action) => {
      state.status = "update Teacher successfully";
      const updatedTeacher = action.payload;
      const index = state.teachers.findIndex(
        (teacher) => teacher._id === updatedTeacher._id
      );
      if (index !== -1) {
        state.teachers[index] = updatedTeacher;
      }
    });
    builder.addCase(updateTeacher.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default teacherSlice.reducer;
