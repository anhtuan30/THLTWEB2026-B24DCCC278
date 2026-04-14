import { useState } from 'react';
import { Table, Button, Space, Modal, Input, InputNumber, Form, message, Select, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TinyEditor from '../../components/TinyEditor';

interface Khoahoc {
    id: number,
    tenKhoaHoc: string,
    moTa: string,
    giangVien: string,
    soLuongHocVien: number,
    trangThai: string,
}

const data =[
    {
        id: 1,
        tenKhoaHoc: 'Lập trình React',
        moTa: 'Khóa học về React',
        giangVien: 'Nguyễn Văn A',
        soLuongHocVien: 30,
        trangThai: 'Đang mở',
    },
    {
        id: 2,
        tenKhoaHoc: 'Lập trình Python',
        moTa: 'Khóa học về Python',
        giangVien: 'Trần Thị B',
        soLuongHocVien: 25,
        trangThai: 'Đã kết thúc',
    },
    {
        id: 3,
        tenKhoaHoc: 'Lập trình Java',
        moTa: 'Khóa học về Java',
        giangVien: 'Lê Văn C',
        soLuongHocVien: 20,
        trangThai: 'Tạm dừng',
    },
    {
        id: 4,
        tenKhoaHoc: 'Lập trình C++',
        moTa: 'Khóa học về C++',
        giangVien: 'Phạm Thị D',
        soLuongHocVien: 15,
        trangThai: 'Đang mở',
    },
    {
        id: 5,
        tenKhoaHoc: 'Lập trình JavaScript',
        moTa: 'Khóa học về JavaScript',
        giangVien: 'Hoàng Văn E',
        soLuongHocVien: 35,
        trangThai: 'Đã kết thúc',
    },

];

const QuanLiKhoaHoc = () =>{
    const[editingItem, setEditingItem] = useState<Khoahoc | null>(null);
    const[dsKhoaHoc, setDsKhoaHoc] = useState(data);
    const[isModalOpen, setIsModalOpen] = useState(false);
    const[form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [selectedGiangVien, setSelectedGiangVien] = useState<string | undefined>(undefined);
    const [selectedTrangThai, setSelectedTrangThai] = useState<string | undefined>(undefined);

    const filteredKhoaHoc = dsKhoaHoc.filter((khoaHoc) => {
        const matchesName = khoaHoc.tenKhoaHoc.toLowerCase().includes(searchText.toLowerCase());
        const matchesGiangVien = selectedGiangVien ? khoaHoc.giangVien === selectedGiangVien : true;
        const matchesTrangThai = selectedTrangThai ? khoaHoc.trangThai === selectedTrangThai : true;
        return matchesName && matchesGiangVien && matchesTrangThai;
    });

    const trangThaiOptions = [
        { value: 'Đang mở', label: 'Đang mở' },
        { value: 'Đã kết thúc', label: 'Đã kết thúc' },
        { value: 'Tạm dừng', label: 'Tạm dừng' },
    ];

    const giangVienOptions = [
        { value: 'Nguyễn Văn A', label: 'Nguyễn Văn A' },
        { value: 'Trần Thị B', label: 'Trần Thị B' },
        { value: 'Lê Văn C', label: 'Lê Văn C' },
        { value: 'Phạm Thị D', label: 'Phạm Thị D' },
        { value: 'Hoàng Văn E', label: 'Hoàng Văn E' },
    ];

    const handleAdd =() => {
        setIsModalOpen(true);
        form.resetFields();
        setEditingItem(null);
    };

    const handleEdit = (record: Khoahoc) => {
        setEditingItem(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            const isDuplicate = dsKhoaHoc.some(
                (k) => k.tenKhoaHoc === values.tenKhoaHoc && (!editingItem || k.id !== editingItem.id),
            );

            if (isDuplicate) {
                message.error('Tên khóa học đã tồn tại!');
                return;
            }

            if (editingItem) {
                setDsKhoaHoc(
                    dsKhoaHoc.map((k: Khoahoc) =>
                        k.id === editingItem.id ? { ...k, ...values, soLuongHocVien: Number(values.soLuongHocVien) } : k,
                    ),
                );
                message.success('Cập nhật thành công!');
            }
            
            else {
                const newKhoaHoc: Khoahoc = {
                    id: Number(values.id),
                    tenKhoaHoc: values.tenKhoaHoc,
                    giangVien: values.giangVien,
                    soLuongHocVien: Number(values.soLuongHocVien),
                    moTa: values.moTa,
                    trangThai: values.trangThai,
                };
                setDsKhoaHoc([...dsKhoaHoc, newKhoaHoc]);
                message.success('Thêm mới thành công!');
            }

            setIsModalOpen(false);
            form.resetFields();
        });
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setEditingItem(null);
    };

    const handleDelete = (id: number) => {
        const course = dsKhoaHoc.find((item) => item.id === id);
        if (!course) {
            return;
        }

        if (course.soLuongHocVien > 0) {
            message.warning('Chỉ được xóa khóa học chưa có học viên!');
            return;
        }
    };
    const columns =[
        {
            title:'ID khóa học',
            dataIndex:'id',
            key:'id',
        },
        {
            title: 'Tên khóa học',
            dataIndex: 'tenKhoaHoc',
            key: 'tenKhoaHoc',
        },
        {
            title:'Mô tả',
            dataIndex:'moTa',
            key:'moTa',
            render: (text: string) => <div dangerouslySetInnerHTML={{ __html: text }} />,
        },
        {
            title:'Giảng viên',
            dataIndex:'giangVien',
            key:'giangVien',
        },
        {
            title:'Số lượng học viên',
            dataIndex:'soLuongHocVien',
            key:'soLuongHocVien',
            sorter: (a: Khoahoc, b: Khoahoc) => a.soLuongHocVien - b.soLuongHocVien,
        },
        {
            title:'Trạng thái',
            dataIndex:'trangThai',
            key:'trangThai',
        },
        {
            title:'Thao tác',
            key:'thaoTac',
            render:(text: any, record: Khoahoc) =>(
                <Space>
                    <Button type='default' icon={<EditOutlined/>} onClick={() => handleEdit(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa khóa học này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type='primary' danger icon={<DeleteOutlined/>}>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        }
    ];
    return(
        <div>
            <h1>Quản lí khóa học</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 16 }}>
                <Button type='primary' icon={<PlusOutlined/>} onClick={handleAdd}>Thêm khóa học</Button>
                <Input.Search
                    placeholder="Tìm kiếm tên khóa học..."
                    allowClear
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Select
                    allowClear
                    placeholder='Lọc giảng viên'
                    style={{ width: 220 }}
                    value={selectedGiangVien}
                    options={giangVienOptions}
                    onChange={(value) => setSelectedGiangVien(value)}
                />
                <Select
                    allowClear
                    placeholder='Lọc trạng thái'
                    style={{ width: 180 }}
                    value={selectedTrangThai}
                    options={trangThaiOptions}
                    onChange={(value) => setSelectedTrangThai(value)}
                />
            </div>
            <Modal title={editingItem ? 'Chỉnh sửa khóa học' : 'Thêm mới khóa học'}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form form={form} layout='vertical'>
                    <Form.Item label='ID khóa học' name='id' rules={[{required: true, message: 'Vui lòng nhập ID khóa học!'}]}>
                        <InputNumber style={{ width: '100%' }} disabled={!!editingItem} />
                    </Form.Item>
                    <Form.Item label='Tên khóa học' name='tenKhoaHoc' rules={[{required: true, message: 'Vui lòng nhập tên khóa học!'},{ max: 100, message: 'Tên khóa học tối đa 100 ký tự!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Giảng viên' name='giangVien' rules={[{required: true, message: 'Vui lòng chọn giảng viên!'}]}>
                        <Select options={giangVienOptions} />
                    </Form.Item>
                    <Form.Item label='Số lượng học viên' name='soLuongHocVien' rules={[{required: true, message: 'Vui lòng nhập số lượng học viên!'}]}>
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    <Form.Item label='Mô tả khóa học' name='moTa' rules={[{required: true, message: 'Vui lòng nhập mô tả khóa học!'}]}>
                        <TinyEditor />
                    </Form.Item>
                    <Form.Item label='Trạng thái khóa học' name='trangThai' rules={[{required: true, message: 'Vui lòng chọn trạng thái!'}]}>
                        <Select options={trangThaiOptions} />
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={filteredKhoaHoc} rowKey='id' />
        </div>
    );
};
export default QuanLiKhoaHoc;