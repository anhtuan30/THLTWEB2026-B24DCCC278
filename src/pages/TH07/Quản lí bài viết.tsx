import { useState } from 'react';
import { Table, Button, Space, Modal, Input, InputNumber, Form, message, Select, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Baiviet {
    id: number,
    tieuDe: string,
    trangThai: string,
    the: string,
    luotXem: number,
    ngayTao: string,
};

const Quanlibaiviet =()=>{

    const data=[
        {
            id: 1,
            tieuDe: 'Bài viết 1',
            trangThai: 'Đã đăng',
            the: 'thể loại 1',
            luotXem: 100,
            ngayTao: '2024-01-01',
        },
        {
            id: 2,
            tieuDe: 'Bài viết 2',
            trangThai: 'Nháp',
            the: 'thể loại 2',
            luotXem: 50,
            ngayTao: '2024-02-01',
        },
        {
            id: 3,
            tieuDe: 'Bài viết 3',
            trangThai: 'Đã đăng',
            the: 'thể loại 1',
            luotXem: 200,
            ngayTao: '2024-03-01',
        },
    ];
    

    const[editingItem, setEditingItem] = useState<Baiviet | null>(null);
    const[form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dsBaiviet, setDsBaiviet] = useState(data);
    const [searchText, setSearchText] = useState('');
    const [selectedTrangThai, setSelectedTrangThai] = useState<string | undefined>(undefined);
    const filteredBaiviet = dsBaiviet.filter((baiviet) => {
        const matchesName = baiviet.tieuDe.toLowerCase().includes(searchText.toLowerCase());
        const matchesTrangThai = selectedTrangThai ? baiviet.trangThai === selectedTrangThai : true;
        return matchesName && matchesTrangThai;
    });

    const trangThaiOptions = [
        { value: 'Nháp', label: 'Nháp' },
        { value: 'Đã đăng', label: 'Đã đăng' },
    ];
    const handleAdd = () => {
        setEditingItem(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record: Baiviet) => {
        form.setFieldsValue(record);
        setEditingItem(record);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
    setDsBaiviet(dsBaiviet.filter(item => item.id !== id));
        message.info('Xóa bài viết thành công!');
    
        };
        


    const handleOk = () => {
        form.validateFields().then((values) => {
            if (editingItem) {
                const newBaiviet = dsBaiviet.map(item => item.id === editingItem.id ? { ...item, ...values } : item);
                setDsBaiviet(newBaiviet);
                message.info('Cập nhật bài viết thành công!');
            } else {
                const newBaiviet = { ...values, id: Date.now() };
                setDsBaiviet([...dsBaiviet, newBaiviet]);
                message.info('Thêm bài viết thành công!');
            }
            setIsModalOpen(false);
            form.resetFields();
        });
    };
    const handleCancel =()=>{
        setIsModalOpen(false);
        form.resetFields();
        setEditingItem(null);
    };
    const columns = [
        {
            title:'Tiêu đề',
            dataIndex:'tieuDe',
            key:'tieuDe',
        },
        {
            title:'Trạng thái',
            dataIndex:'trangThai',
            key:'trangThai',
        },
        {
            title:'Thẻ',
            dataIndex:'the',
            key:'the',
        },
        {
            title:'Lượt xem',
            dataIndex:'luotXem',
            key:'luotXem',
        },
        {
            title:'Slug',
            dataIndex:'slug',
            key:'slug',
        },
        {
            title:'Nội dung',
            dataIndex:'noiDung',
            
        },
        {
            title:'Ngày tạo',
            dataIndex:'ngayTao',
            key:'ngayTao',
        },
        {
            title:'Thao tác',
            key:'thaoTac',
            render:(text: any, record: Baiviet) =>(
                <Space size='middle'>
                    <Button type='primary' icon={<EditOutlined />} onClick={()=>handleEdit(record)}>Sửa</Button>
                    <Popconfirm
                    title='Bạn có chắc chắn muốn xóa bài viết này không?'
                    onConfirm={() => handleDelete(record.id)}
                    okText='Có'
                    cancelText='Không'>
                        <Button type='primary' danger icon={<DeleteOutlined />}>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return(
        <div>
        <h1>Quản lý bài viết</h1>
        <Button type='primary' style={{marginBottom:16}} icon={<PlusOutlined />}onClick={handleAdd}>Thêm bài viết</Button>
        <Input.Search 
            placeholder="Tìm kiếm tên khóa học..."
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300, marginLeft:16 }}
        />
        <Select 
                    allowClear
                    placeholder='Lọc theo trạng thái'
                    style={{ width: 220, marginLeft:16 }}
                    value={selectedTrangThai}
                    options={trangThaiOptions}
                    onChange={(value) => setSelectedTrangThai(value)}
                />
        
            
        <Modal title='Thêm/Sửa bài viết'
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
            <form>
                <Form form={form} layout='vertical'>
                    <Form.Item name='tieuDe' label='Tiêu đề' rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='trangThai' label='Trạng thái' rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                        <Select>
                            <Select.Option value='Nháp'>Nháp</Select.Option>
                            <Select.Option value='Đã đăng'>Đã đăng</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='the' label='Thẻ'>
                        <Input />
                    </Form.Item>
                    <Form.Item name='luotXem' label='Lượt xem'>
                        <InputNumber min={0} />
                    </Form.Item>
                </Form>
            </form>
        </Modal>
        <Table columns={columns} dataSource={filteredBaiviet}/>
        </div>
    );

};
export default Quanlibaiviet;