import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
export type Task = {
  id: string;
  text: string;
  completed: boolean;
};
export type Filter = 'all' | 'active' | 'completed';
type State = {
  tasks: Task[];
  filter: Filter;
};
type Actions = {
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, text: string) => void;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
};
export const useTodoStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      tasks: [],
      filter: 'all',
      addTask: (text: string) => {
        if (!text.trim()) return;
        const newTask: Task = {
          id: uuidv4(),
          text: text.trim(),
          completed: false,
        };
        set((state) => {
          state.tasks.unshift(newTask);
        });
      },
      toggleTask: (id: string) => {
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (task) {
            task.completed = !task.completed;
          }
        });
      },
      deleteTask: (id: string) => {
        set((state) => {
          state.tasks = state.tasks.filter((t) => t.id !== id);
        });
      },
      updateTask: (id: string, text: string) => {
        if (!text.trim()) return;
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (task) {
            task.text = text.trim();
          }
        });
      },
      setFilter: (filter: Filter) => {
        set({ filter });
      },
      clearCompleted: () => {
        set((state) => {
            state.tasks = state.tasks.filter((t) => !t.completed);
        });
      }
    })),
    {
      name: 'clarity-todo-list',
      storage: createJSONStorage(() => localStorage),
    }
  )
);