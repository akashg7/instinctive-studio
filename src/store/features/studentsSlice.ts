import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Student } from '@/types';
import { supabase } from '@/lib/supabase';

interface StudentsState {
  items: Student[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StudentsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Fetch all students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        student_courses (
          course:courses (*)
        )
      `);
    
    if (error) throw error;
    return data;
  }
);

// Create a new student
export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (student: Omit<Student, 'id'>) => {
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
);

// Update a student
export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, ...updates }: Partial<Student> & { id: string }) => {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
);

// Delete a student
export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id: string) => {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return id;
  }
);

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch students
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // Create student
      .addCase(createStudent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update student
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default studentsSlice.reducer;