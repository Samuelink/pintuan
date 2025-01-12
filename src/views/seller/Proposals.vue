<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <a-layout-header class="bg-white shadow-sm fixed w-full z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        <h1 class="text-xl font-semibold text-gray-900">卖家管理中心</h1>
        <a-avatar>
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>
    </a-layout-header>

    <!-- 主要内容区域 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <!-- 数据概览 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <a-card v-for="(stat, index) in statistics" :key="index">
          <Statistic
            :title="stat.title"
            :value="stat.value"
            :precision="stat.precision"
            :prefix="stat.prefix"
            :suffix="stat.suffix"
          />
        </a-card>
      </div>

      <!-- 提案管理区域 -->
      <a-card title="提案管理" :bordered="false" class="mb-8">
        <!-- 工具栏 -->
        <div class="mb-4 flex flex-wrap gap-4">
          <a-select
            v-model:value="filters.status"
            style="width: 120px"
            placeholder="状态筛选"
          >
            <a-select-option value="">全部状态</a-select-option>
            <a-select-option value="pending">待处理</a-select-option>
            <a-select-option value="accepted">已接受</a-select-option>
            <a-select-option value="rejected">已拒绝</a-select-option>
          </a-select>

          <a-range-picker 
            v-model:value="filters.dateRange"
            :placeholder="['开始日期', '结束日期']"
          />

          <a-input-search
            v-model:value="filters.keyword"
            placeholder="搜索买家"
            style="width: 200px"
            @search="onSearch"
          />
        </div>

        <!-- 提案表格 -->
        <a-table
          :columns="columns"
          :data-source="proposals"
          :loading="loading"
          :pagination="{
            total: 100,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true
          }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a-space>
                <a-button 
                  type="primary" 
                  size="small"
                  :disabled="record.status !== 'pending' || proposals.some(p => p.status === 'accepted' && p.key !== record.key)"
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
              </a-space>
            </template>
            <template v-else-if="column.key === 'status'">
              <a-tag :color="getStatusColor(record.status)">
                {{ getStatusText(record.status) }}
              </a-tag>
            </template>
            <template v-else-if="column.key === 'price'">
              ¥{{ formatPrice(record.price) }}
            </template>
          </template>
        </a-table>
      </a-card>

      <!-- 操作记录 -->
      <a-card title="操作记录" :bordered="false">
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
  CheckCircleOutlined,
  CloseCircleOutlined,
  MessageOutlined
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

// 状态
const loading = ref(false)
const filters = reactive({
  status: '',
  dateRange: [],
  keyword: ''
})

// 统计数据
const statistics = ref([
  { title: '总房源', value: 12, precision: 0 },
  { title: '活跃竞拍', value: 5, precision: 0 },
  { title: '待处理提案', value: 8, precision: 0 },
  { title: '成交总额', value: 1235, precision: 0, prefix: '¥', suffix: '万' }
])

// 表格列定义
const columns = [
  {
    title: '买家',
    dataIndex: 'buyerName',
    key: 'buyerName',
    width: 120,
  },
  {
    title: '出价',
    dataIndex: 'price',
    key: 'price',
    width: 120,
    sorter: true,
  },
  {
    title: '付款方式',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    width: 100,
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    width: 160,
    sorter: true,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 200,
  }
]

// 提案数据
const proposals = ref([
  {
    key: '1',
    buyerName: '张三',
    price: 2150000,
    paymentMethod: '全款',
    submitTime: '2024-03-20 15:30:00',
    status: 'pending'
  },
  {
    key: '2',
    buyerName: '李四',
    price: 2180000,
    paymentMethod: '按揭',
    submitTime: '2024-03-20 16:45:00',
    status: 'pending'
  }
])

// 操作日志
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
  }
])

// 工具函数
const getStatusColor = (status) => {
  const colors = {
    pending: 'blue',
    accepted: 'green',
    rejected: 'red',
    eliminated: 'gray'
  }
  return colors[status] || 'default'
}

const getStatusText = (status) => {
  const texts = {
    pending: '待处理',
    accepted: '已接受',
    rejected: '已拒绝',
    eliminated: '已淘汰'
  }
  return texts[status] || status
}

const formatPrice = (price) => {
  return (price / 10000).toFixed(2) + '万'
}

// 处理函数
const handleAccept = (record) => {
  proposals.value.forEach(proposal => {
    if (proposal.status === 'accepted') {
      proposal.status = 'eliminated'
      addOperationLog({
        title: '提案淘汰',
        description: `由于接受新提案，${proposal.buyerName}的提案被自动淘汰，金额：${formatPrice(proposal.price)}`,
        color: 'gray',
        icon: CloseCircleOutlined
      })
    }
  })

  record.status = 'accepted'
  message.success(`已接受 ${record.buyerName} 的提案`)
  addOperationLog({
    title: '接受提案',
    description: `接受了${record.buyerName}的购房提案，金额：${formatPrice(record.price)}`,
    color: 'green',
    icon: CheckCircleOutlined
  })
}

const handleReject = (record) => {
  record.status = 'rejected'
  message.warning(`已拒绝 ${record.buyerName} 的提案`)
  addOperationLog({
    title: '拒绝提案',
    description: `拒绝了${record.buyerName}的购房提案，金额：${formatPrice(record.price)}`,
    color: 'red',
    icon: CloseCircleOutlined
  })
}

const handleContact = (record) => {
  message.info(`正在联系 ${record.buyerName}`)
  addOperationLog({
    title: '联系买家',
    description: `尝试联系${record.buyerName}`,
    color: 'blue',
    icon: MessageOutlined
  })
}

const onSearch = (value) => {
  console.log('搜索:', value)
}

const addOperationLog = (log) => {
  operationLogs.value.unshift({
    id: Date.now(),
    time: '刚刚',
    ...log
  })
}
</script>

<style scoped>
.ant-layout-header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  height: 64px;
  line-height: 64px;
  padding: 0;
}

.ant-card {
  transition: all 0.3s ease;
}

.ant-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style> 