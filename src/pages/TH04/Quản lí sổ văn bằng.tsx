import { PlusCircleOutlined  } from '@ant-design/icons';
import{ useState} from 'react';
import { Table, Space, Button, Form, Modal, Input, message, InputNumber, Popconfirm } from 'antd';

type SoVanBang = {
    key: number;
    tenSoVanBang: string;
    namTotNghiep: number;
    soSoDaCap: number;
    trangThai: 'Đang mở' | 'Đã đóng';
};

const QuanLiSoVanBang = () =>{
    const[form] =Form.useForm();
    const[isModalOpen,setModalOpen]=useState(false);
    const[dsSoVanBang,setDsSoVanBang]=useState<SoVanBang[]>([]);
    const [editingKey, setEditingKey] = useState<number | null>(null);

    const showModal =()=>{
        form.resetFields();
        setEditingKey(null);
        setModalOpen(true);
    };

    const showEditModal = (record: SoVanBang) => {
        form.setFieldsValue({
            tenSoVanBang: record.tenSoVanBang,
            namTotNghiep: record.namTotNghiep,
            soSoDaCap: record.soSoDaCap,
            trangThai: record.trangThai,
        });
        setEditingKey(record.key);
        setModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const isSameNameAndYear = dsSoVanBang.some(
                (item) =>
                    item.namTotNghiep === values.namTotNghiep &&
                    item.tenSoVanBang.trim().toLowerCase() === values.tenSoVanBang.trim().toLowerCase() &&
                    item.key !== editingKey,
            );
            if (isSameNameAndYear) {
                message.error('Sổ văn bằng cùng tên và năm đã tồn tại. Vui lòng kiểm tra lại.');
                return;
            }

            const baseSoSoDaCap = editingKey !== null ? (dsSoVanBang.find((item) => item.key === editingKey)?.soSoDaCap ?? 0) : 0;
            const record: SoVanBang = {
                key: editingKey ?? Date.now(),
                tenSoVanBang: values.tenSoVanBang,
                namTotNghiep: values.namTotNghiep,
                soSoDaCap: editingKey !== null ? baseSoSoDaCap : 0,
                trangThai: values.trangThai || 'Đang mở',
            };

            if (editingKey !== null) {
                setDsSoVanBang((prev) => prev.map((item) => (item.key === editingKey ? record : item)));
                message.success('Cập nhật sổ văn bằng thành công!');
            } else {
                setDsSoVanBang((prev) => [...prev, record]);
                message.success('Thêm mới sổ văn bằng thành công!');
            }

            setModalOpen(false);
            form.resetFields();
            setEditingKey(null);
        } catch (errorInfo) {
            // Validation failed
        }
    };

    const handleCancel=()=>{
        setModalOpen(false);
        setEditingKey(null);
    };

    const handleDelete = (key: number) => {
        setDsSoVanBang((prev) => prev.filter((item) => item.key !== key));
        message.success('Xóa sổ văn bằng thành công.');
    };

    const columns =[
        {
            title: 'STT',
            key: 'stt',
            render: (_: any, __: any, index: number) => index + 1,
        },

        {
            title:'Tên sổ văn bằng',
            dataIndex:'tenSoVanBang',
            key:'tenSoVanBang',
        },

        {
            title:'Năm tốt nghiệp',
            dataIndex:'namTotNghiep',
            key:'namTotNghiep',
        },

        {
            title:'Số lượng văn bằng đã cấp',
            dataIndex:'soSoDaCap',
            key:'soSoDaCap',
            render: (value: number) => value,
        },

        {
            title:'Trạng thái',
            dataIndex:'trangThai',
            key:'trangThai',
        },

        {
            title:'Thao tác',
            key:'thaoTac',
            render:(_: any, record: SoVanBang)=>(
                <Space>
                    <Button type='primary' onClick={() => showEditModal(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa sổ văn bằng này không?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type='default' danger>Xóa</Button>
                    </Popconfirm>
                </Space>)
        },
    ];
    return(
        <div>
            <h1>Quản lí sổ văn bằng</h1>
            <Button type='primary' style={{marginBottom: 15}}
            onClick={showModal}
            icon={<PlusCircleOutlined />}>Thêm mới</Button>
            <Modal title = {editingKey ? 'Chỉnh sửa sổ văn bằng' : 'Thêm mới sổ văn bằng'}
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}>
                <Form form={form} layout='vertical'>
                    <Form.Item label='Tên sổ văn bằng' name='tenSoVanBang' rules= {[{required:true, message:'Vui lòng nhập tên sổ văn bằng'}]}>
                        <Input placeholder='Nhập tên sổ văn bằng'/>
                    </Form.Item>

                    <Form.Item label='Năm tốt nghiệp' name='namTotNghiep' rules={[{required: true, message:'Vui lòng nhập năm tốt nghiệp'}]}>
                        <InputNumber style={{ width: '100%' }} min={2000} max={2100} placeholder='Nhập năm tốt nghiệp'/>
                    </Form.Item>

                    <Form.Item label='Số lượng văn bằng đã cấp'>
                        <InputNumber style={{ width: '100%' }} value={0} disabled />
                        <div style={{ marginTop: 8, color: '#999' }}>
                            Mặc định 0 khi mở sổ mới (reset từ đầu); sẽ tăng khi thêm thông tin văn bằng.
                        </div>
                    </Form.Item>

                    <Form.Item label="Trạng thái" name="trangThai" initialValue="Đang mở">
                        <Input placeholder="Đang mở / Đã đóng" />
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={dsSoVanBang} pagination={{pageSize:5}} />
        </div>
);
};
export default QuanLiSoVanBang;