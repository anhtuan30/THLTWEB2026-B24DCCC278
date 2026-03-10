import { Table, Button, Space } from 'antd';
const OanTuTi =() =>{
  const columns = [
    {
      title: 'Ván',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Người chơi',
      dataIndex: 'player',
      key: 'player',
    },
    {
      title: 'Máy tính',
      dataIndex: 'computer',
      key: 'computer',
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
      }
  ];
  return(
    <div style = {{padding:24}}>
      <h1>Trò chơi Oẳn Tù Tì</h1>
      <Space>

      <Button type='primary' style = {{marginBottom: '20px'}}>Kéo</Button>
      <Button type='primary' style = {{marginBottom: '20px'}}>Búa</Button>
      <Button type='primary' style = {{marginBottom: '20px'}}>Bao</Button>
      </Space>
      <Table columns={columns} dataSource={[]} />
    </div>
  );

};



export default OanTuTi;
