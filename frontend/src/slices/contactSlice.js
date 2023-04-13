import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allContacts:[],
  sortedContacts:[]
}

const compareByName = (a, b) => {
  const nameA = a.full_name.toLowerCase();
  const nameB = b.full_name.toLowerCase();

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
        let indexToUpdate = state.allContacts.findIndex(obj => obj.employee_id === action.payload.oldObj.employee_id);
        state.allContacts[indexToUpdate] = action.payload.contact;
        state.sortedContacts = [...state.allContacts].sort(compareByName);
    },
    deleteContact: (state,action) => {
      let indexToRemove = state.allContacts.findIndex(obj => obj.employee_id === action.payload.employee_id);
      if (indexToRemove !== -1) {
        state.allContacts.splice(indexToRemove, 1);
        state.sortedContacts = [...state.allContacts].sort(compareByName)
      }
    },
    addContact: (state, action) => {
      state.allContacts.push(action.payload);
      state.sortedContacts = [...state.allContacts].sort(compareByName);
    },
    addAll: (state,action) => {
      state.allContacts = action.payload;
      state.sortedContacts = [...state.allContacts].sort(compareByName);
    }
  },
})

export const { updateContact, deleteContact, addContact, addAll } = contactSlice.actions;

export default contactSlice.reducer;