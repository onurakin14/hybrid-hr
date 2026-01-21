import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName?: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {};
    ip: string;
    address: {};
    macAddress: string;
    university: string;
    bank: {};
    company: {};
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: {};
    role: string;
}

interface UsersState {
    users: User[];
    currentUser: User | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: UsersState = {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    success: false,
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers", async () => {
        const res = await axios.get("/api/users");
        return res.data;
    }
);

export const fetchUserById = createAsyncThunk(
    "users/fetchUserById", async (id: number) => {
        const res = await axios.get(`/api/users/${id}`);
        return res.data;
    }
);

export const createUser = createAsyncThunk(
    "users/createUser", async (userData: User) => {
        const res = await axios.post("/api/users", userData);
        return res.data;
    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser", async ({ userData }: { userData: Partial<User> }) => {
        const res = await axios.put(`/api/users/${userData.id}`, userData);
        return res.data;
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser", async (id: number) => {
        const res = await axios.delete(`/api/users/${id}`);
        return res.data;
    }
);

// Users Slice
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        },
        clearUsers: (state) => {
            state.users = [];
            state.currentUser = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        // Fetch Users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.success = true;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch User By ID
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.success = true;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create User
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
                state.success = true;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update User
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                if (state.currentUser?.id === action.payload.id) {
                    state.currentUser = action.payload;
                }
                state.success = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete User
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
                if (state.currentUser?.id === action.payload) {
                    state.currentUser = null;
                }
                state.success = true;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentUser, clearUsers, clearError, clearSuccess } = usersSlice.actions;
export default usersSlice.reducer;
