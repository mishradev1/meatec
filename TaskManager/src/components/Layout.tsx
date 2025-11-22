import { Outlet, useNavigate } from 'react-router-dom';
import { Layout as AntLayout, Avatar, Dropdown, type MenuProps, Space, Typography } from 'antd';
import { LogoutOutlined, UserOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store/useAuthStore';

const { Header, Content } = AntLayout;
const { Text } = Typography;

export const Layout = () => {
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems: MenuProps['items'] = [
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
            danger: true,
        },
    ];

    return (
        <AntLayout className="min-h-screen bg-gray-50">
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(0,0,0,0.03)',
                    padding: '0 24px',
                    height: '64px',
                }}
            >
                <div className="flex items-center gap-3">
                    <Text strong style={{ fontSize: '20px', letterSpacing: '-0.5px', color: '#1f1f1f' }}>
                        {/* Task<span style={{ color: '#00b96b' }}>Flow</span> */}
                    </Text>
                </div>

                <div className="flex items-center gap-4">
                    {user && (
                        <Dropdown
                            menu={{ items: menuItems }}
                            placement="bottomRight"
                            arrow={{ pointAtCenter: true }}
                            trigger={['click']}
                        >
                            <Space className="cursor-pointer hover:bg-gray-100/50 py-1.5 px-3 rounded-full transition-all duration-200 border border-transparent hover:border-gray-200">
                                <Avatar
                                    src={user.avatar}
                                    icon={<UserOutlined />}
                                    style={{ backgroundColor: '#00b96b', border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                    size="small"
                                />
                                <div className="hidden sm:flex flex-col leading-none">
                                    <Text strong style={{ fontSize: '13px', color: '#333' }}>{user.username}</Text>
                                </div>
                            </Space>
                        </Dropdown>
                    )}
                </div>
            </Header>

            <Content className="site-layout" style={{ padding: '24px 50px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <div style={{ minHeight: 380 }}>
                    <Outlet />
                </div>
            </Content>
        </AntLayout>
    );
};
