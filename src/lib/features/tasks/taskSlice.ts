import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

/* ---------------- TYPES ---------------- */

export type TaskStatus = 'backlog' | 'todo' | 'inprogress' | 'done';
export type SortType = 'date' | 'title' | 'priority';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  status: TaskStatus;
  priority: 1 | 2 | 3;
  createdAt: string;
}

interface Filters {
  status: TaskStatus | 'all';
  completed: boolean | 'all';
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  viewMode: 'board' | 'list';
  filters: Filters;
  sort: SortType;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: TaskState = {
  tasks: [],
  loading: false,
  viewMode: 'board',
  filters: {
    status: 'all',
    completed: 'all',
  },
  sort: 'date',
};

/* ---------------- ASYNC ---------------- */

export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchTasks',
  async () => {
    const res = await fetch('https://dummyjson.com/todos?limit=12');
    const data = await res.json();

    return data.todos.map((todo: any, index: number): Task => ({
      id: todo.id,
      title: todo.todo,
      completed: todo.completed,
      userId: todo.userId,
      status: todo.completed
        ? 'done'
        : index % 3 === 0
        ? 'backlog'
        : index % 3 === 1
        ? 'todo'
        : 'inprogress',
      priority: (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3,
      createdAt: new Date(
        Date.now() - index * 86400000
      ).toISOString(),
    }));
  }
);

/* ---------------- SLICE ---------------- */

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleView: (state) => {
      state.viewMode = state.viewMode === 'board' ? 'list' : 'board';
    },

    createTask: (
      state,
      action: PayloadAction<{ title: string; status: TaskStatus }>
    ) => {
      state.tasks.unshift({
        id: Date.now(),
        title: action.payload.title,
        completed: action.payload.status === 'done',
        userId: 0,
        status: action.payload.status,
        priority: 2,
        createdAt: new Date().toISOString(),
      });
    },

    setStatusFilter: (
      state,
      action: PayloadAction<TaskStatus | 'all'>
    ) => {
      state.filters.status = action.payload;
    },

    setCompletedFilter: (
      state,
      action: PayloadAction<boolean | 'all'>
    ) => {
      state.filters.completed = action.payload;
    },

    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      });
  },
});

/* ---------------- SELECTOR ---------------- */

export const selectFilteredSortedTasks = (state: {
  tasks: TaskState;
}) => {
  const { tasks, filters, sort } = state.tasks;
  let result = [...tasks];

  if (filters.status !== 'all') {
    result = result.filter(t => t.status === filters.status);
  }

  if (filters.completed !== 'all') {
    result = result.filter(t => t.completed === filters.completed);
  }

  switch (sort) {
    case 'title':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'priority':
      result.sort((a, b) => b.priority - a.priority);
      break;
    case 'date':
    default:
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
  }

  return result;
};

export const {
  toggleView,
  createTask,
  setStatusFilter,
  setCompletedFilter,
  setSort,
} = taskSlice.actions;

export default taskSlice.reducer;
