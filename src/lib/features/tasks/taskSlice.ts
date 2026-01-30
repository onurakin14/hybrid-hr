import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'done';

export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  tags?: string[];
  priority?: Priority;
  status?: TaskStatus;
  assignee?: string;
  dueDate?: string;
}

export type SortField = 'priority' | 'todo';
export type SortOrder = 'asc' | 'desc';

interface TaskFilter {
  status?: TaskStatus;
  priority?: Priority;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  isCreateOpen: boolean;
  filter: TaskFilter;
  sort: {
    field: SortField | null;
    order: SortOrder;
  };
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  isCreateOpen: false,
  filter: {},
  sort: {
    field: null,
    order: 'asc',
  },
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('https://dummyjson.com/todos?limit=20');
  const data = await response.json();

  return data.todos.map((task: any, index: number) => ({
    ...task,
    status: getStatusFromIndex(index),
    priority: getPriorityFromIndex(index),
    tags: getTagsFromIndex(index),
  }));
});

function getStatusFromIndex(index: number): TaskStatus {
  const statuses: TaskStatus[] = ['backlog', 'todo', 'in-progress', 'done'];
  return statuses[index % 4];
}

function getPriorityFromIndex(index: number): Priority {
  const priorities: Priority[] = ['low', 'medium', 'high'];
  return priorities[index % 3];
}

function getTagsFromIndex(index: number): string[] {
  const allTags = [
    ['Research'],
    ['Bug'],
    ['Design'],
    ['Backend'],
    ['Marketing'],
    ['UI/UX'],
    ['DevOps'],
    ['Frontend'],
  ];
  return allTags[index % allTags.length];
}

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: { todo: string; tags: string[]; priority: Priority }) => {
    const response = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: taskData.todo,
        completed: false,
        userId: 1,
      }),
    });
    const data = await response.json();

    return {
      ...data,
      tags: taskData.tags,
      priority: taskData.priority,
      status: 'todo' as TaskStatus,
    };
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: Partial<Task> & { id: number }) => {
    const response = await fetch(`https://dummyjson.com/todos/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return await response.json();
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number) => {
    await fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

/* ================= SLICE ================= */
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleCreate: (state) => {
      state.isCreateOpen = !state.isCreateOpen;
    },

    moveTask: (
      state,
      action: PayloadAction<{ taskId: number; status: TaskStatus }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.status;
      }
    },

    toggleTaskComplete: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed) {
          task.status = 'done';
        }
      }
    },

    setFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = {
        ...state.filter,  
        ...action.payload, 
      };
    },


    clearFilter: (state) => {
      state.filter = {};
    },

      setSort: (state, action: PayloadAction<{ field: SortField }>) => {
      if (state.sort.field === action.payload.field) {
        state.sort.order = state.sort.order === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort.field = action.payload.field;
        state.sort.order = 'asc';
      }
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...action.payload };
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export const {
  toggleCreate,
  moveTask,
  toggleTaskComplete,
  setFilter,
  clearFilter,
  setSort,
} = tasksSlice.actions;

export default tasksSlice.reducer;
