'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Tag, App } from 'antd';
import { api } from '@/lib/api';

const { Title } = Typography;

export default function SettingsPage() {
  const { message } = App.useApp();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setData(res.data);
    } catch {
      message.error('Lỗi tải danh sách người dùng nôi bộ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { title: 'Họ và tên', dataIndex: 'name', key: 'name' },
    { title: 'Email Đăng Nhập', dataIndex: 'email', key: 'email' },
    { 
      title: 'Phân quyền rảnh rỗi', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status}</Tag>
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>Quản trị hệ thống Admin</Title>
        <Button type="primary">Cấp tài khoản Nhân Viên (Role)</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
    </div>
  );
}
