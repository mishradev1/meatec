import { create } from 'zustand';
import axios from 'axios';
import type { TaskState } from '../types';

const API_URL = '/api';

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    isLoading: false,
    error: null,

    fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/tasks`);
            set({ tasks: response.data, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch tasks', isLoading: false });
        }
    },

    addTask: async (newTask) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/tasks`, newTask);
            set((state) => ({ tasks: [...state.tasks, response.data], isLoading: false }));
        } catch (error) {
            set({ error: 'Failed to add task', isLoading: false });
        }
    },

    updateTask: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
            set((state) => ({
                tasks: state.tasks.map((task) => (task.id === id ? response.data : task)),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: 'Failed to update task', isLoading: false });
        }
    },

    deleteTask: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${API_URL}/tasks/${id}`);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: 'Failed to delete task', isLoading: false });
        }
    },
}));
