import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Form, Input, Button, Card, Typography, Alert, theme } from 'antd';
import { UserOutlined, LockOutlined, CheckSquareOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const { Title, Text } = Typography;

export const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { token } = theme.useToken();

    const onFinish = async (values: any) => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post('/api/login', values);
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card
                    bordered={false}
                    className="shadow-lg"
                    style={{ borderRadius: token.borderRadiusLG }}
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl mb-4">
                            <CheckSquareOutlined style={{ fontSize: '24px', color: '#00b96b' }} />
                        </div>
                        <Title level={2} style={{ margin: 0 }}>Welcome Back</Title>
                        <Text type="secondary">Sign in to manage your tasks</Text>
                    </div>

                    {error && (
                        <Alert
                            message={error}
                            type="error"
                            showIcon
                            className="mb-6"
                            closable
                            onClose={() => setError(null)}
                        />
                    )}

                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="text-gray-400" />}
                                placeholder="Username"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Sign In
                            </Button>
                        </Form.Item>

                        <div className="text-center">
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                Use <Text strong>test</Text> / <Text strong>test1234</Text>
                            </Text>
                        </div>
                    </Form>
                </Card>
            </motion.div>
        </div>
    );
};
