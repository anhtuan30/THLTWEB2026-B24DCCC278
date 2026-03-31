import { Button, Table, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
type CLB ={
    key: number;
    tenCLB: string;
    ngayThanhLap: string;
    moTa: string;
    chuNhiemCLB: string;
    hoatDong: 'Có' | 'Không';
}
const QuanLiThanhVien = () =>{
        const columns =[
            {
                title:'Tên CLB',
                dataIndex:'tenCLB',
                key:'tenClb'
            },
            {
                title:'Ngày thành lập',
                dataIndex:'ngayThanhLap',
                key:'ngayThanhLap',
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
                <h1>Danh sach CLB</h1>
                <Button type='primary' icon={<PlusOutlined/>}>Thêm mới</Button>
                <Table columns={columns} dataSource={[]} pagination={{pageSize:5}}/>
            </div>
        );
};
export default QuanLiThanhVien;