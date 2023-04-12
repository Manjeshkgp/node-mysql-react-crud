import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allContacts:[],
  sortedContacts:[]
}

const compareByName = (a, b) => {
  const nameA = a.Name.toLowerCase();
  const nameB = b.Name.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    updateContact: (state,action) => {
        let indexToUpdate = state.allContacts.findIndex(obj => obj.Number === action.payload.oldObj.Number);
        state.allContacts[indexToUpdate] = action.payload.newObj;
        state.sortedContacts = [...state.allContacts].sort(compareByName);
    },
    deleteContact: (state,action) => {
      let indexToRemove = state.allContacts.findIndex(obj => obj.Number === action.payload.Number);
      if (indexToRemove !== -1) {
        state.allContacts.splice(indexToRemove, 1);
        state.sortedContacts = [...state.allContacts].sort(compareByName)
      }
    },
    addContact: (state, action) => {
      state.allContacts.push(action.payload);
      state.sortedContacts = [...state.allContacts].sort(compareByName);
    },
  },
})

export const { updateContact, deleteContact, addContact } = contactSlice.actions;

export default contactSlice.reducer;