import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://redux-app-backend.vercel.app/students"
    );
    return response.data;
  }
);

// Delete student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    const response = await axios.delete(
      `https://redux-app-backend.vercel.app/students/${studentId}`
    );
    return response.data;
  }
);

// Add a new student
export const addNewStudent = createAsyncThunk(
  "post/postStudentData",
  async (newStudentData) => {
    const response = await axios.post(
      "https://redux-app-backend.vercel.app/students",
      newStudentData
    );
    return response.data;
  }
);

// Update a  student
export const updateStudent = createAsyncThunk(
  "put/updateStudent",
  async ({ studentId, updatedStudentData }) => {
    const response = await axios.put(
      `https://redux-app-backend.vercel.app/students/${studentId}`,
      updatedStudentData
    );
    return response.data;
  }
);

export const studentSlice = createSlice({
  name: "studentsData",
  initialState: {
    students: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch students
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // Delete student
    builder.addCase(deleteStudent.pending, (state) => {
      state.status = "loading...";
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.status = "Successfully Deleted";
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    });
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // Add new student
    builder.addCase(addNewStudent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewStudent.fulfilled, (state, action) => {
      state.status = "success";
      state.students.push(action.payload);
    });
    builder.addCase(addNewStudent.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //update Student
    builder.addCase(updateStudent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      state.status = "update Student successfully";
      const updatedStudent = action.payload;
      const index = state.students.findIndex(
        (student) => student._id === updatedStudent._id
      );
      if (index !== -1) {
        state.students[index] = updatedStudent;
      }
    });
    builder.addCase(updateStudent.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default studentSlice.reducer;
