import {createSlice} from '@reduxjs/toolkit';

export const stateSlice = createSlice({
    name:"stateSlice",
    initialState:{
        clients:[],
        skills:[],
        query:[],
    },
    reducers:{
        "setData": (state, action)=>{
            console.log("In StateSlice:")
            //convert clients data to array
            let tempArray = [];
            for(var key in action.payload.clients){
                tempArray.push({...action.payload.clients[key]})
            }
            state.clients = tempArray;
            state.skills = [...action.payload.skills];
        },
        "saveQuery":(state, action)=>{
            //using redux toolkit will not mutate state
            state.query = action.payload;
        },
        "updateClients":(state, action)=>{
            //using redux toolkit will not mutate state
           state.clients=action.payload;
        }
    }
})

export const {setData, saveQuery, updateClients} = stateSlice.actions;
export default stateSlice.reducer;