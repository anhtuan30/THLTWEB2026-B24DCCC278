import {Table,Button,Modal,Form, Space, message, Input, InputNumber} from 'antd';
import { useState } from 'react';
const QuanLiNhanVienVaDichVu =()=>{
    const[isModalOpenNhanVien,setIsModalOpenNhanVien] = useState(false);
    const[isModalOpenDichVu,setIsModalOpenDichVu] = useState(false);
    const[dsNhanVien,setDsNhanVien] = useState<any[]>([]);
    const[dsDichVu,setDsDichVu] = useState<any[]>([]);
    const[formNhanVien] = Form.useForm();
    const[formDichVu] = Form.useForm();

    const showModalNhanVien =()=>{
        setIsModalOpenNhanVien(true);
    };

    const showModalDichVu =()=>{
        setIsModalOpenDichVu(true);
    };

    const handleOkNhanVien =()=> {
        formNhanVien.validateFields().then((values) => {
            const newNhanVien = {...values,key: Date.now(),};
            setDsNhanVien([...dsNhanVien, newNhanVien]);
        setIsModalOpenNhanVien(false);
        message.info('Thêm mới thành công!');
        formNhanVien.resetFields();
    });
};
    const handleOkDichVu =()=> {
        formDichVu.validateFields().then((values) => {
            const newDichVu = {...values,key: Date.now(),};
            setDsDichVu([...dsDichVu, newDichVu]);
        setIsModalOpenDichVu(false);
        message.info('Thêm mới thành công!');
        formDichVu.resetFields();
    });
};


    const handleCancelNhanVien =()=> {
        setIsModalOpenNhanVien(false);
    };

    const handleCancelDichVu =()=> {
        setIsModalOpenDichVu(false);
    };

    const columns =[
        {
            title: 'Tên Nhân Viên',
            dataIndex: 'tenNhanVien',
            key: 'tenNhanVien',
        },
        {
            title: 'Dịch Vụ',
            dataIndex: 'dichVu',
            key: 'dichVu',
        },
        {
            title:'Phục vụ giới hạn khách/ngày',
            dataIndex:'phucVuGioiHan',
            key:'phucVuGioiHan',
        },
        {
            title:'Lịch làm việc',
            dataIndex:'lichLamViec',
            key:'lichLamViec',
        },
        {
            title:'Thao tác',
            key:'thaoTac',
            render:()=>(
                <Space>
                    <Button type='default'>Xóa</Button>
                    <Button type='primary'>Sửa</Button>

                </Space>
            ),
        },
    ];

    const columns1 =[
        {
            title:'Tên dịch vụ',
            dataIndex:'tenDichVu',
            key:'tenDichVu',
        },
        {
            title:'Giá',
            dataIndex:'gia',
            key:'gia',
        },
        {
            title:'Thời gian thực hiện',
            dataIndex:'thoiGianThucHien',
            key:'thoiGianThucHien',
        }

    ];

    return(
        <div>
            <h1>Quản lí nhân viên</h1>
            <Button type ='primary' style={{marginBottom:15}}
            onClick={showModalNhanVien}>Thêm mới</Button>
            <Modal title="Thêm mới"
            visible={isModalOpenNhanVien}
            onOk={handleOkNhanVien}
            onCancel={handleCancelNhanVien}>
                <Form form={formNhanVien} layout='vertical'>
                    <Form.Item label="Tên nhân viên" name="tenNhanVien" rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}>
                        <Input placeholder="Nhập tên nhân viên"/>
                    </Form.Item>

                    <Form.Item label="Dịch vụ" name="dichVu" rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}>
                        <Input placeholder="Nhập tên dịch vụ"/>
                    </Form.Item>

                    <Form.Item label="Phục vụ giới hạn khách/ngày" name="phucVuGioiHan" rules={[{ required: true, message: 'Vui lòng nhập số khách!' }]}>
                        <InputNumber min ={1} placeholder="Nhập số khách" width= '100%'/>
                    </Form.Item>

                    <Form.Item label="Lịch làm việc" name="lichLamViec" rules={[{ required: true, message: 'Vui lòng nhập lịch làm việc!' }]}>
                        <Input placeholder="Ví dụ: 9h-17h thứ 6"/>
                    </Form.Item>
                </Form>
        </Modal>

            <Table style={{marginBottom:50}}
            columns ={columns} dataSource={dsNhanVien} pagination={{pageSize:5}}/>

            <h1>Quản lí dịch vụ</h1>
            <Button type='primary' style={{marginBottom:15}}
            onClick={showModalDichVu}>Thêm mới</Button>
            <Modal title="Thêm mới"
            visible={isModalOpenDichVu}
            onOk={handleOkDichVu}
            onCancel={handleCancelDichVu}>
                <Form form ={formDichVu} layout='vertical'>
                <Form.Item label="Tên dịch vụ" name="tenDichVu" rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}>
                        <Input placeholder="Nhập tên dịch vụ"/>
                    </Form.Item>

                    <Form.Item label="Giá" name="gia" rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}>
                        <InputNumber min={0} placeholder="Nhập số tiền" width='100%'/>
                    </Form.Item>

                    <Form.Item label="Thời gian thực hiện" name="thoiGianThucHien" rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}>
                        <InputNumber min={0} placeholder="Nhập thời gian" width='100%'/>
                    </Form.Item>
                </Form>
        </Modal>
            <Table columns={columns1} dataSource={dsDichVu} pagination ={{pageSize:5}}/>


        </div>

    );

};
export default QuanLiNhanVienVaDichVu;
