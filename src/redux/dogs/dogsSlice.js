import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  breeds: [],
  dogs: [],
  saved: [],
  query: ''
};

export const fetchDogBreeds = createAsyncThunk('dogs/fetchDogBreeds', async () => {
  try {
    const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
      method: 'GET',
      credentials: 'include', // Send credentials (cookies) with the request
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Dog Breeds:', data);
      return data; // Return the data to be stored in the state
    } else {
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be handled by the rejected case
  }
});

export const searchDogs = createAsyncThunk('dogs/search', async ({ breeds, zipCode, ageMin, ageMax, size, sort }) => {
  try {
    console.log(zipCode)
    if((breeds.length === 1 && breeds.includes('')) || breeds.length< 1){
        breeds = false;
    }
    if((zipCode.length === 1 && zipCode.includes('')) || zipCode.length< 1){
        zipCode = false;
    }
    if(ageMin.length < 1){
        ageMin = false;
    }
    if(ageMax.length < 1){
        ageMax = false;
    }
    console.log('zipCode',zipCode)
    // Build the query parameters
    let queryParams = new URLSearchParams();
    if (breeds) queryParams.append('breeds', breeds.join(','));
    if (zipCode) queryParams.append('zipCodes', zipCode.join(','));
    if (ageMin) queryParams.append('ageMin', ageMin.toString());
    if (ageMax) queryParams.append('ageMax', ageMax.toString());
    if (size) queryParams.append('size', size.toString());
    if (sort) queryParams.append('sort', sort);
    console.log(queryParams)

    const url = `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include', // Send credentials (cookies) with the request
    });
    console.log('response', response)

    if (response.ok) {
      const data = await response.json();
    //   for(let obj)
      console.log('Search Results:', data);
      return data; // Return the search results to be stored in the state
    } else {
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be handled by the rejected case
  }
});

export const nextOrPrev = createAsyncThunk('dogs/details', async (urlString) => {
  try {
    const url = `https://frontend-take-home-service.fetch.com${urlString}`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include', // Send credentials (cookies) with the request
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched new data:', data);
      return data; // Return the fetched dogs to be stored in the state
    } else {
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be handled by the rejected case
  }
});
export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async (dogIds) => {
  try {
    const url = 'https://frontend-take-home-service.fetch.com/dogs';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dogIds),
      credentials: 'include', // Send credentials (cookies) with the request
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched Dogs:', data);
      return data; // Return the fetched dogs to be stored in the state
    } else {
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be handled by the rejected case
  }
});

export const matchDog = createAsyncThunk('dogs/matchDog', async (dogIds) => {
  try {
    const url = 'https://frontend-take-home-service.fetch.com/dogs/match';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dogIds),
      credentials: 'include', // Send credentials (cookies) with the request
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Matched Dog:', data);
      return data; // Return the matched dog to be stored in the state
    } else {
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be handled by the rejected case
  }
});

export const fetchLocations = createAsyncThunk('dogs/fetchLocations', async (zipCodes) => {
  try {
    const url = 'https://frontend-take-home-service.fetch.com/locations';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zipCodes),
      credentials: 'include', // Send credentials (cookies) with the request
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched Locations:', data);
      return data; // Return the fetched locations to be stored in the state
    } else {
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be handled by the rejected case
  }
});

export const searchLocations = createAsyncThunk('dogs/searchLocations', async ({ city, states, geoBoundingBox, size, from }) => {
  try {
    const url = 'https://frontend-take-home-service.fetch.com/locations/search';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city, states, geoBoundingBox, size, from }),
      credentials: 'include', // Send credentials (cookies) with the request
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Search Results:', data);
      return data; // Return the search results to be stored in the state
    } else {
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be handled by the rejected case
  }
});

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    clearState: (state) => {
        return initialState;
      },
    toggleSaved: (state, payload) => {
        const id = payload.payload
        let index;
        if(state.saved.length > 0){

            index = state.saved.findIndex((dog) => dog.id === id);


        } else {
            index = -1
        }

        if (index !== -1) {
            // Dog is already saved, remove it from the array
            return {
              ...state,
              saved: state.saved.filter((dog) => dog.id !== id),
            };
          } else {
            // Dog is not saved, add it to the array
            console.log(id)
            const dogToAdd = state.details.find((dog) => dog.id === id);
            return {
              ...state,
              saved: [...state.saved, dogToAdd],
            };
        }
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDogBreeds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDogBreeds.fulfilled, (state, action) => {
      state.loading = false;
      state.breeds = action.payload; // Update the state with the fetched breeds
    });
    builder.addCase(fetchDogBreeds.rejected, (state, action) => {
      state.loading = false;
      // Handle error and update state accordingly
    });
    builder.addCase(searchDogs.pending, (state) => {
    state.loading = true;
    });
    builder.addCase(searchDogs.fulfilled, (state, action) => {
        state.loading = false;
        state.dogs = []
        state.dogs = action.payload;
        state.query = action.meta.requestId
    });
    builder.addCase(searchDogs.rejected, (state, action) => {
        state.loading = false;
        // Handle error and update state accordingly
    });
    builder.addCase(nextOrPrev.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(nextOrPrev.fulfilled, (state, action) => {
        state.loading = false;
        state.dogs = action.payload;
    });
    builder.addCase(nextOrPrev.rejected, (state, action) => {
        state.loading = false;
        // Handle error and update state accordingly
    });
    builder.addCase(fetchDogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDogs.fulfilled, (state, action) => {
      state.loading = false;
      state.details = action.payload
      // Update state with fetched dogs
    });
    builder.addCase(fetchDogs.rejected, (state, action) => {
      state.loading = false;
      // Handle error and update state accordingly
    });
    builder.addCase(matchDog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(matchDog.fulfilled, (state, action) => {
      state.loading = false;
      // Update state with matched dog
    });
    builder.addCase(matchDog.rejected, (state, action) => {
      state.loading = false;
      // Handle error and update state accordingly
    });
    builder.addCase(fetchLocations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.loading = false;
      // Update state with fetched locations
    });
    builder.addCase(fetchLocations.rejected, (state, action) => {
      state.loading = false;
      // Handle error and update state accordingly
    });
    builder.addCase(searchLocations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchLocations.fulfilled, (state, action) => {
      state.loading = false;
      // Update state with search results
    });
    builder.addCase(searchLocations.rejected, (state, action) => {
      state.loading = false;
      // Handle error and update state accordingly
    });
  },
});

export const { clearState, toggleSaved } = dogsSlice.actions;
export default dogsSlice.reducer;
