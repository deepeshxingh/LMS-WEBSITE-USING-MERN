import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name : "course",
  initialState:{
    course:null,
  },
  reducers:{
    //actions
    setCourse:(state,action) =>{
      state.course = action.payload;
    },
    deleteCourse: (state, action) => {
      state.course = state.course.filter((c) => c._id !== action.payload);
    },
  }
})

export const {setCourse, deleteCourse} = courseSlice.actions;

export default courseSlice.reducer;