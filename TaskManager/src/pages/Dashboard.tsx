import { useEffect, useState } from 'react';
import { Typography, Button, Modal, Form, Input, Select, Row, Col, Empty, Spin, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../store/useTaskStore';
import { TaskCard } from '../components/TaskCard';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const Dashboard = () => {
    const { tasks, isLoading, fetchTasks, addTask, deleteTask, updateTask } = useTaskStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreate = async (values: any) => {
        try {
            await addTask(values);
            message.success('Task created successfully');
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            message.error('Failed to create task');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <Title level={2} style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.5px' }}>
                        My Workspace
                    </Title>
                    <Text type="secondary" style={{ fontSize: '16px' }}>
                        Here's what's on your plate today.
                    </Text>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        height: '48px',
                        padding: '0 24px',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: 500,
                        boxShadow: '0 4px 12px rgba(0, 185, 107, 0.2)'
                    }}
                >
                    Create New Task
                </Button>
            </div>

            {isLoading && tasks.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" tip="Loading tasks..." />
                </div>
            ) : tasks.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-100">
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <Text type="secondary">No tasks found. Create one to get started.</Text>
                        }
                    >
                        <Button type="primary" onClick={() => setIsModalOpen(true)}>
                            Create Now
                        </Button>
                    </Empty>
                </div>
            ) : (
                <Row gutter={[24, 24]}>
                    <AnimatePresence mode="popLayout">
                        {tasks.map((task) => (
                            <Col xs={24} sm={12} lg={8} key={task.id}>
                                <TaskCard
                                    task={task}
                                    onDelete={deleteTask}
                                    onUpdate={updateTask}
                                />
                            </Col>
                        ))}
                    </AnimatePresence>
                </Row>
            )}

            <Modal
                title="Create New Task"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreate}
                    initialValues={{ status: 'todo' }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter a task title' }]}
                    >
                        <Input placeholder="What needs to be done?" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter a description' }]}
                    >
                        <TextArea rows={4} placeholder="Add some details..." />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                    >
                        <Select>
                            <Option value="todo">To Do</Option>
                            <Option value="in-progress">In Progress</Option>
                            <Option value="done">Done</Option>
                        </Select>
                    </Form.Item>

                    <div className="flex justify-end gap-2 mt-6">
                        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Create Task
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};
