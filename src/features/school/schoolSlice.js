import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "School",
  initialState: {
    totalStudents: 0,
    averageAttendance: 0,
    averageMarks: 0,
    topStudent: null,
  },
  reducers: {
    updateSchoolStats: (state, action) => {
      const { totalStudents, averageAttendance, averageMarks } = action.payload;
      state.totalStudents = totalStudents;
      state.averageAttendance = averageAttendance;
      state.averageMarks = averageMarks;
    },

    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
  },
});

export const { updateSchoolStats, setTopStudent } = schoolSlice.actions;
export default schoolSlice.reducer;
