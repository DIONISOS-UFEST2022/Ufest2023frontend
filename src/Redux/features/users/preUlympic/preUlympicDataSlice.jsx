import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teamName: "",
    numberOfPlayers: "",
};

const preUlympicDataSlice = createSlice({
    name: "preUlympicData",
    initialState,
    reducers: {
        setNamaTim(state, action) {
        state.teamName = action.payload;
        },
        setNumberOfPlayers(state, action) {
        state.numberOfPlayers = action.payload;
        },
    },
});

export const selectPreUlympicData = (state) => state.preUlympicData;

export const { setNamaTim, setNumberOfPlayers, savePreUlympicRegistration } = preUlympicDataSlice.actions;

export default preUlympicDataSlice.reducer;
