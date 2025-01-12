import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Select, DatePicker, Upload, Button, Card, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function SubmitProposal() {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const [isPaid, setIsPaid] = useState(false);

  const handleSubmit = async (values: any) => {
    if (!isPaid) {
      Modal.confirm({
        title: '支付保证金',
        content: '点击确认将模拟支付保证金（演示用）',
        onOk: () => {
          setIsPaid(true);
          Modal.success({
            title: '保证金支付成功',
            content: '您可以继续提交提案',
          });
        },
      });
      return;
    }

    // 提交提案
    Modal.success({
      title: '提案提交成功',
      content: '卖家将尽快审核您的提案',
      onOk: () => router.push(`/auction/${id}`),
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card title="提交竞拍提案" className="mb-4">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="出价金额"
            name="price"
            rules={[{ required: true }]}
          >
            <Input prefix="¥" type="number" />
          </Form.Item>

          <Form.Item
            label="付款方式"
            name="paymentMethod"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="full">全款</Option>
              <Option value="mortgage">按揭</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="计划付款时间"
            name="paymentDate"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="附加说明"
            name="description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="购房资格证明"
            name="qualification"
          >
            <Upload.Dragger multiple accept=".pdf,.jpg,.png">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件上传</p>
            </Upload.Dragger>
          </Form.Item>

          {/* 保证金状态显示 */}
          <Card className="mb-4">
            <div className="flex justify-between items-center">
              <span>保证金状态</span>
              <span className={isPaid ? 'text-green-500' : 'text-red-500'}>
                {isPaid ? '已支付' : '未支付'}
              </span>
            </div>
          </Card>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              提交提案
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
} 