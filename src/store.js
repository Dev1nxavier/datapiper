import {configureStore} from '@reduxjs/toolkit';
import stateSlice from './features/stateSlice';

export default configureStore({
    reducer: {
        stateSlice: stateSlice,
    },
})