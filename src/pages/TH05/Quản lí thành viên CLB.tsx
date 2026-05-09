import {useState} from 'react';
import { Button, Table, Space,Image,Avatar, Form, Modal, Input, message,DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
type CLB ={
    key: number;
    tenCLB: string;
    ngayThanhLap: string;
    moTa: string;
    chuNhiemCLB: string;
    hoatDong: 'Có' | 'Không';
}

const QuanLiThanhVien =() =>{
    const [danhSachCLB,setDanhSachCLB] = useState<CLB[]>([]);
    const [form] = Form.useForm();
    const [isModalOpen,setModalOpen] = useState(false);

    const showModal =()=>{
        form.resetFields();
        setModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            const newCLB = {...values,key: Date.now(),};
            setDanhSachCLB([...danhSachCLB, newCLB]);
        setModalOpen(false);
        message.info('Thêm mới thành công!');
        form.resetFields();
    });
};

    const handleCancel = () => {
        form.resetFields();
        setModalOpen(false);
    };

    const columns =[
        {
            title:'Ảnh đại diện',
            dataIndex:'anhDaiDien',
            key:'anhDaiDien',
        },
        {
            title:'Tên CLB',
            dataIndex:'tenCLB',
            key:'tenClb'
        },
        {
            title:'Ngày thành lập',
            dataIndex:'ngayThanhLap',
            key:'ngayThanhLap',
            render: (date: Date) => date ? new Date(date).toLocaleDateString('vi-VN') : ''
        },
        {
            title:'Mô tả',
            dataIndex:'moTa',
            key:'moTa',
        },
        {
            title:'Chủ nhiệm CLB',
            dataIndex:'chuNhiemCLB',
            key:'chuNhiemCLB',
        },
        {
            title:'Hoạt Động',
            dataIndex:'hoatDong',
            key:'hoatDong',
        },
        {
            title:'Thao tác',
            key:'thaoTac',
            render:(_: any, record: CLB) => (
                <Space>
                <Button type="primary" icon={<EditOutlined/>}>Sửa</Button>
                <Button type="default" icon={<DeleteOutlined/>}>Xóa</Button>
                </Space>
            )
        },
    ];

    return(
        <div>
            <h1>Danh sách CLB</h1>
            <Button type='primary' icon={<PlusOutlined/>} style={{marginBottom:15}}
            onClick={showModal}>Thêm mới</Button>
            <Modal
            title={'Thêm mới danh sách'}
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}>
                <Form form={form} layout={'vertical'}>
                    <Form.Item
                    label='Tên CLB'
                    name='tenCLB'
                    rules={[{ required: true, message: 'Vui lòng nhập tên CLB' }]}>
                        <Input placeholder={' Nhập tên CLB'}/>
                    </Form.Item>

                    <Form.Item
                    label='Ngày thành lập'
                    name='ngayThanhLap'
                    rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}>
                        <DatePicker style={{width: '100%'}} placeholder={'Chọn thời gian thành lập'}/>
                    </Form.Item>

                    <Form.Item
                    label='Chủ nhiệm CLB'
                    name='chuNhiemCLB'
                    rules={[{ required: true, message: 'Vui lòng nhập tên chủ nhiệm CLB' }]}>
                        <Input placeholder={'Nhập tên chủ nhiêm CLB'}/>
                    </Form.Item>

                    <Form.Item
                    label='Hoạt động'
                    name='hoatDong'
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái hoạt động' }]}>
                        <Input placeholder="Có / Không"/>
                    </Form.Item>
                    
                </Form>
            </Modal>
            <Table columns={columns} dataSource={danhSachCLB} pagination={{pageSize:5}}/>
        </div>
    );
};

export default QuanLiThanhVien;