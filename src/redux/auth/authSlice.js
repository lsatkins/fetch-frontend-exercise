import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  token: null,
  user: null,
  loggedIn: false,
  loading: false,
};
  
export const loginUser = createAsyncThunk('auth/login', async ({ name, email }) => {
    try {

      const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
        credentials: 'include', // Send credentials (cookies) with the request
      });
  
      // Access the response headers to check the Set-Cookie header
      const setCookieHeader = response.headers.get('set-cookie');
      console.log('Set-Cookie Header:', setCookieHeader);
  
      if (response.ok) {
  
        // Rest of the code to handle the response
      } else {
        throw new Error('Error: ' + response.status); // Handle non-OK response
      }
    } catch (error) {
      // Error handling
    }
  });

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    try {
      // Make the API call to logout and invalidate the token
      await fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      // Return any necessary data
    } catch (error) {
      throw new Error(error.message);
    }
  });

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log('payload',action)
            state.token = action.payload;
            state.loggedIn = true;
            state.loading = false;
            state.user = null; // Set the user property if applicable
          });
          builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            // Handle error and update state accordingly
          });
          builder.addCase(logoutUser.fulfilled, (state) => {
            state.token = null;
            state.loggedIn = false;
            state.user = null;
          });
    },
  });

  export default authSlice.reducer;


  
  