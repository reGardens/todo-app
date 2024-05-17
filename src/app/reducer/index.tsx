import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface Data {
    id: number;
    name: string;
}

interface State {
    loading: boolean;
    data: Data[];
    error: boolean;
}

const initialState: State = {
    loading: false,
    data: [],
    error: false,
}

export const getTimeAsync = createAsyncThunk(
    "time/getTime",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("http://worldtimeapi.org/api/timezone/Asia/Jakarta");
            return data;

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                return rejectWithValue(axiosError.response?.data.message);
            } else {
                // Handle jenis error lain jika diperlukan
                return rejectWithValue("Unknown error occurred.");
            }
        }
    }
);

const timeSlice = createSlice({
    name: "time",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTimeAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTimeAsync.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload.data;
                state.error = false;
            })
            .addCase(getTimeAsync.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { actions: timeActions, reducer: timeReducer } = timeSlice;
