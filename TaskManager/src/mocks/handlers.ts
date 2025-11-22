import { http, HttpResponse } from 'msw';
import type { Task } from '../types';

const tasks: Task[] = [
    {
        id: '1',
        title: 'Complete Project Proposal',
        description: 'Draft the initial proposal for the new client project.',
        status: 'todo',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Review Codebase',
        description: 'Audit the legacy code for potential refactoring.',
        status: 'in-progress',
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Update Documentation',
        description: 'Ensure all API docs are up to date.',
        status: 'done',
        createdAt: new Date().toISOString(),
    },
];

export const handlers = [
    // Login
    http.post('/api/login', async ({ request }) => {
        const { username, password } = (await request.json()) as any;

        if (username === 'test' && password === 'test1234') {
            return HttpResponse.json({
                user: {
                    id: 'u1',
                    username: 'test',
                    email: 'test@example.com',
                    avatar: 'https://ui-avatars.com/api/?name=Test+User&background=0D8ABC&color=fff',
                },
                token: 'mock-jwt-token-12345',
            });
        }

        return new HttpResponse(null, { status: 401, statusText: 'Unauthorized' });
    }),

    // Get Tasks
    http.get('/api/tasks', () => {
        return HttpResponse.json(tasks);
    }),

    // Add Task
    http.post('/api/tasks', async ({ request }) => {
        const newTask = (await request.json()) as Omit<Task, 'id' | 'createdAt'>;
        const task: Task = {
            id: Math.random().toString(36).substring(7),
            createdAt: new Date().toISOString(),
            ...newTask,
        };
        tasks.push(task);
        return HttpResponse.json(task, { status: 201 });
    }),

    // Update Task
    http.put('/api/tasks/:id', async ({ params, request }) => {
        const { id } = params;
        const updates = (await request.json()) as Partial<Task>;
        const taskIndex = tasks.findIndex((t) => t.id === id);

        if (taskIndex > -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
            return HttpResponse.json(tasks[taskIndex]);
        }

        return new HttpResponse(null, { status: 404 });
    }),

    // Delete Task
    http.delete('/api/tasks/:id', ({ params }) => {
        const { id } = params;
        const taskIndex = tasks.findIndex((t) => t.id === id);

        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            return new HttpResponse(null, { status: 200 });
        }

        return new HttpResponse(null, { status: 404 });
    }),
];
