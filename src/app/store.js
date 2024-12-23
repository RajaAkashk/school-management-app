import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "../features/students/studentSlice";
import { schoolSlice } from "../features/school/schoolSlice";

const store = configureStore({
  reducer: {
    students: studentSlice.reducer,
    school: schoolSlice.reducer,
  },
});

export default store;
