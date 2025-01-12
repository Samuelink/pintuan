<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <nav class="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-100">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            卖家管理后台
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <a-avatar>
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <span class="text-gray-700">管理员</span>
        </div>
      </div>
    </nav>

    <div class="pt-24 container mx-auto px-4 pb-8">
      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <a-card hoverable class="text-center">
          <template #cover>
            <div class="p-4 bg-blue-50">
              <ShoppingOutlined class="text-4xl text-blue-500" />
            </div>
          </template>
          <p class="text-lg font-medium text-gray-600">总房源</p>
          <p class="text-2xl font-bold text-blue-600">12</p>
        </a-card>

        <a-card hoverable class="text-center">
          <template #cover>
            <div class="p-4 bg-green-50">
              <TeamOutlined class="text-4xl text-green-500" />
            </div>
          </template>
          <p class="text-lg font-medium text-gray-600">活跃竞拍</p>
          <p class="text-2xl font-bold text-green-600">5</p>
        </a-card>

        <a-card hoverable class="text-center">
          <template #cover>
            <div class="p-4 bg-yellow-50">
              <FileTextOutlined class="text-4xl text-yellow-500" />
            </div>
          </template>
          <p class="text-lg font-medium text-gray-600">待处理提案</p>
          <p class="text-2xl font-bold text-yellow-600">8</p>
        </a-card>

        <a-card hoverable class="text-center">
          <template #cover>
            <div class="p-4 bg-red-50">
              <DollarOutlined class="text-4xl text-red-500" />
            </div>
          </template>
          <p class="text-lg font-medium text-gray-600">成交总额</p>
          <p class="text-2xl font-bold text-red-600">¥1,235万</p>
        </a-card>
      </div>

      <!-- 提案管理 -->
      <a-card title="提案管理" class="mb-8 shadow-sm">
        <template #extra>
          <div class="flex space-x-4">
            <a-button type="primary" @click="handleEndAuction">
              <template #icon><ClockCircleOutlined /></template>
              结束竞拍
            </a-button>
            <a-button @click="handleExtendTime">
              <template #icon><PlusOutlined /></template>
              延长时间
            </a-button>
          </div>
        </template>

        <!-- 筛选器 -->
        <div class="mb-6 flex flex-wrap gap-4">
          <a-select
            v-model:value="filters.status"
            style="width: 200px"
            placeholder="提案状态"
          >
            <a-select-option value="all">全部提案</a-select-option>
            <a-select-option value="pending">待处理</a-select-option>
            <a-select-option value="accepted">已接受</a-select-option>
            <a-select-option value="rejected">已拒绝</a-select-option>
          </a-select>

          <a-range-picker 
            v-model:value="filters.dateRange"
            style="width: 300px"
          />

          <a-input-search
            v-model:value="filters.search"
            placeholder="搜索买家..."
            style="width: 250px"
          />
        </div>

        <!-- 提案列表 -->
        <a-table
          :columns="columns"
          :data-source="proposals"
          :loading="loading"
          :pagination="{ 
            total: 50,
            showSizeChanger: true,
            showQuickJumper: true
          }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'price'">
              <span class="text-blue-600 font-medium">¥{{ record.price.toLocaleString() }}</span>
            </template>
            
            <template v-if="column.key === 'depositStatus'">
              <a-tag :color="record.depositStatus === 'paid' ? 'green' : 'red'">
                {{ record.depositStatus === 'paid' ? '已支付' : '未支付' }}
              </a-tag>
            </template>

            <template v-if="column.key === 'status'">
              <a-tag :color="getStatusColor(record.status)">
                {{ getStatusText(record.status) }}
              </a-tag>
            </template>

            <template v-if="column.key === 'action'">
              <div class="space-x-2">
                <a-button 
                  type="primary"
                  size="small"
                  :disabled="record.status !== 'pending'"
                  @click="handleAccept(record)"
                >
                  接受
                </a-button>
                <a-button
                  danger
                  size="small"
                  :disabled="record.status !== 'pending'"
                  @click="handleReject(record)"
                >
                  拒绝
                </a-button>
                <a-button
                  type="link"
                  size="small"
                  @click="handleContact(record)"
                >
                  联系买家
                </a-button>
              </div>
            </template>
          </template>
        </a-table>
      </a-card>

      <!-- 操作记录 -->
      <a-card title="操作记录" class="shadow-sm">
        <a-timeline>
          <a-timeline-item 
            v-for="log in operationLogs" 
            :key="log.id"
            :color="log.color"
          >
            <template #dot>
              <component :is="log.icon" />
            </template>
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium">{{ log.title }}</p>
                <p class="text-gray-500 text-sm">{{ log.description }}</p>
              </div>
              <span class="text-gray-400 text-sm">{{ log.time }}</span>
            </div>
          </a-timeline-item>
        </a-timeline>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
  UserOutlined,
  ShoppingOutlined,
  TeamOutlined,
  FileTextOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MessageOutlined
} from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'

const loading = ref(false)
const filters = reactive({
  status: 'all',
  dateRange: [],
  search: ''
})

// 表格列定义
const columns = [
  {
    title: '买家',
    dataIndex: 'buyerName',
    key: 'buyerName',
  },
  {
    title: '出价',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
  },
  {
    title: '付款方式',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    sorter: true,
  },
  {
    title: '保证金',
    dataIndex: 'depositStatus',
    key: 'depositStatus',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
  }
]

// 模拟提案数据
const proposals = ref([
  {
    id: '1',
    buyerId: 'user1',
    buyerName: '张三',
    price: 2150000,
    paymentMethod: '全款',
    submitTime: '2024-03-20 15:30:00',
    depositStatus: 'paid',
    status: 'pending'
  },
  {
    id: '2',
    buyerId: 'user2',
    buyerName: '李四',
    price: 2180000,
    paymentMethod: '按揭',
    submitTime: '2024-03-20 16:45:00',
    depositStatus: 'paid',
    status: 'pending'
  }
])

// 模拟操作日志
const operationLogs = ref([
  {
    id: 1,
    title: '接受提案',
    description: '接受了张三的购房提案，金额：¥215万',
    time: '10分钟前',
    color: 'green',
    icon: CheckCircleOutlined
  },
  {
    id: 2,
    title: '拒绝提案',
    description: '拒绝了王五的购房提案，金额：¥208万',
    time: '1小时前',
    color: 'red',
    icon: CloseCircleOutlined
  },
  {
    id: 3,
    title: '延长竞拍时间',
    description: '将竞拍截止时间延长24小时',
    time: '2小时前',
    color: 'blue',
    icon: ClockCircleOutlined
  }
])

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'blue'
    case 'accepted': return 'green'
    case 'rejected': return 'red'
    default: return 'default'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'pending': return '待处理'
    case 'accepted': return '已接受'
    case 'rejected': return '已拒绝'
    default: return '未知状态'
  }
}

const handleAccept = (record) => {
  Modal.confirm({
    title: '确认接受提案',
    content: `确定接受${record.buyerName}的提案吗？接受后将自动拒绝其他提案。`,
    onOk: () => {
      record.status = 'accepted'
      message.success('已接受提案')
    }
  })
}

const handleReject = (record) => {
  Modal.confirm({
    title: '确认拒绝提案',
    content: `确定拒绝${record.buyerName}的提案吗？`,
    onOk: () => {
      record.status = 'rejected'
      message.success('已拒绝提案')
    }
  })
}

const handleContact = (record) => {
  message.info(`正在打开与${record.buyerName}的对话窗口...`)
}

const handleEndAuction = () => {
  Modal.confirm({
    title: '确认结束竞拍',
    content: '结束后将不再接受新的提案，确定继续吗？',
    onOk: () => {
      message.success('竞拍已结束')
    }
  })
}

const handleExtendTime = () => {
  Modal.confirm({
    title: '延长竞拍时间',
    content: '确定要延长竞拍时间吗？',
    onOk: () => {
      message.success('竞拍时间已延长')
    }
  })
}
</script>

<style scoped>
.ant-card {
  border-radius: 12px;
}

.ant-btn {
  border-radius: 6px;
}

.ant-table {
  border-radius: 8px;
}

.ant-timeline {
  margin-top: 1rem;
}

.operation-card {
  transition: all 0.3s ease;
}

.operation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style> 