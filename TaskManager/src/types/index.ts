export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    createdAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}
