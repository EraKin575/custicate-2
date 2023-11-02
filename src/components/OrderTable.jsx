import { useState } from 'react';
import { Button, Modal, Table, Form, Input, InputNumber } from 'antd';

const OrderTable = ({ data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  // Toggle selection
  const onRowSelected = (record) => {
    const key = record.key;
    const newSelectedRowKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter(k => k !== key)
      : [...selectedRowKeys, key];
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customerName",
    },
    {
      title: "Customer Email",
      dataIndex: "customer_email",
      key: "customerEmail",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const handleEdit = () => {
    if (selectedRowKeys.length !== 1) {
      return;
    }
    const recordToEdit = filteredData.find(item => selectedRowKeys.includes(item.id));
    setEditingKey(recordToEdit.id);
    form.setFieldsValue(recordToEdit);
    setModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const row = await form.validateFields();
      const newData = [...filteredData];
      const index = newData.findIndex(item => editingKey === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setFilteredData(newData);
        setEditingKey(null);
      }
      setModalOpen(false);
      setSelectedRowKeys([]);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setEditingKey(null);
  };

  const handleDelete = () => {
    const newData = filteredData.filter(item => !selectedRowKeys.includes(item.id));
    setFilteredData(newData);
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onSelect: (record, selected) => {
      onRowSelected(record);
    },
    onSelectAll: (selected, selectedRows) => {
      const keys = selected ? selectedRows.map(r => r.key) : [];
      setSelectedRowKeys(keys);
    },
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex">
        {selectedRowKeys.length === 1 && (
          <Button className="mr-2 bg-blue-500 font-bold text-white" onClick={handleEdit}>
            Edit
          </Button>
        )}
        {selectedRowKeys.length > 0 && (
          <Button
          className='mr-2 bg-red-500 font-bold text-white'
           onClick={handleDelete}>Delete</Button>
        )}
      </div>
      <Modal
        title="Edit Order"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="Order ID" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="customer_name" label="Customer Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="customer_email" label="Customer Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="product" label="Product" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, type: 'number', min: 1 }]}>
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => {
            onRowSelected(record);
          },
        })}
        dataSource={filteredData.map(item => ({ ...item, key: item.id }))}
        columns={columns}
      />
    </div>
  );
};

export default OrderTable;
