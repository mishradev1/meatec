import React from 'react';
import { Card, Tag, Button, Tooltip, Typography, Space } from 'antd';
import { DeleteOutlined, CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import type { Task } from '../types';

const { Text, Paragraph } = Typography;

interface TaskCardProps {
    task: Task;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Task>) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate }) => {
    const statusConfig = {
        todo: { color: 'default', icon: <ClockCircleOutlined />, text: 'To Do', next: 'in-progress' },
        'in-progress': { color: 'processing', icon: <SyncOutlined spin />, text: 'In Progress', next: 'done' },
        done: { color: 'success', icon: <CheckCircleOutlined />, text: 'Done', next: 'todo' },
    } as const;

    const config = statusConfig[task.status];

    const handleStatusClick = () => {
        onUpdate(task.id, { status: config.next as any });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            <Card
                hoverable
                className="h-full flex flex-col"
                actions={[
                    <Tooltip title={`Mark as ${statusConfig[config.next as keyof typeof statusConfig].text}`}>
                        <Button type="text" onClick={handleStatusClick} icon={config.icon}>
                            {config.text}
                        </Button>
                    </Tooltip>,
                    <Tooltip title="Delete Task">
                        <Button type="text" danger onClick={() => onDelete(task.id)} icon={<DeleteOutlined />} />
                    </Tooltip>,
                ]}
            >
                <div className="mb-3">
                    <Tag color={config.color} icon={config.icon}>
                        {config.text}
                    </Tag>
                </div>
                <Card.Meta
                    title={
                        <Text strong style={{ fontSize: '16px' }}>
                            {task.title}
                        </Text>
                    }
                    description={
                        <Space direction="vertical" size="small" className="w-full">
                            <Paragraph ellipsis={{ rows: 3 }} type="secondary" style={{ marginBottom: 0, minHeight: '66px' }}>
                                {task.description}
                            </Paragraph>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                Created: {new Date(task.createdAt).toLocaleDateString()}
                            </Text>
                        </Space>
                    }
                />
            </Card>
        </motion.div>
    );
};
