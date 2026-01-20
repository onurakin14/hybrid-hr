// lib/features/tasks/taskSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

export type Status = "backlog" | "todo" | "inprogress" | "done"
export type Priority = "low" | "medium" | "high"

export interface User {
  id: number
  name: string
  avatar: string
}

export interface Task {
  id: number
  todo: string
  status: Status
  completed: boolean
  priority: Priority
  tags: string[]
  user: User
  date: string
}

interface State {
  tasks: Task[]
  loading: boolean
  view: "board" | "list"
  isCreateOpen: boolean
}

const initialState: State = {
  tasks: [],
  loading: false,
  view: "board",
  isCreateOpen: false,
}

/* ---------------- FETCH ---------------- */
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await fetch("https://dummyjson.com/todos?limit=12")
  const data = await res.json()

  return data.todos.map((t: any, i: number): Task => ({
    id: t.id,
    todo: t.todo,
    completed: false,
    status: ["backlog", "todo", "inprogress", "done"][i % 4] as Status,
    priority: ["low", "medium", "high"][i % 3] as Priority,
    tags: ["Design", "Backend", "UI/UX"].slice(0, (i % 2) + 1),
    user: {
      id: 1,
      name: "Esra Yılmaz",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    date: "2025-10-28",
  }))
})

/* ---------------- CREATE ---------------- */
export const createTask = createAsyncThunk(
  "tasks/create",
  async (payload: {
    todo: string
    priority: Priority
    tags: string[]
  }) => {
    return {
      id: Date.now(),
      todo: payload.todo,
      completed: false,
      status: "todo",
      priority: payload.priority,
      tags: payload.tags,
      user: {
        id: 1,
        name: "Esra Yılmaz",
        avatar: "https://i.pravatar.cc/40?img=1",
      },
      date: new Date().toISOString().split("T")[0],
    } as Task
  }
)

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    moveTask(
      state,
      action: PayloadAction<{ id: number; status: Status }>
    ) {
      const task = state.tasks.find(t => t.id === action.payload.id)
      if (task) task.status = action.payload.status
    },
    toggleView(state) {
      state.view = state.view === "board" ? "list" : "board"
    },
    toggleCreate(state) {
      state.isCreateOpen = !state.isCreateOpen
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (s, a) => {
        s.tasks = a.payload
      })
      .addCase(createTask.fulfilled, (s, a) => {
        s.tasks.unshift(a.payload)
      })
  },
})

export const { moveTask, toggleView, toggleCreate } = slice.actions
export default slice.reducer
