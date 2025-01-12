<template>
  <div class="max-w-6xl mx-auto p-4">
    <!-- 房屋基本信息区 -->
    <a-card class="mb-4">
      <h1 class="text-2xl font-bold mb-4">{{ auction.title }}</h1>
      <a-carousel autoplay>
        <div v-for="(img, index) in auction.images" :key="index" class="h-[400px] relative">
          <img 
            :src="img" 
            :alt="`房屋图片${index + 1}`" 
            class="w-full h-full object-cover"
          />
        </div>
      </a-carousel>
      
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p>起拍价：¥{{ auction.startPrice.toLocaleString() }}</p>
          <p>保证金：¥{{ auction.deposit.toLocaleString() }}</p>
          <p>截止时间：{{ auction.endTime }}</p>
        </div>
        <div>
          <p>面积：{{ auction.area }}㎡</p>
          <p>户型：{{ auction.layout }}</p>
          <p>楼层：{{ auction.floor }}</p>
        </div>
      </div>
    </a-card>

    <!-- 竞拍状态区 -->
    <a-card class="mb-4">
      <div class="flex justify-between items-center mb-4">
        <a-tag :color="statusColor">
          {{ statusText }}
        </a-tag>
        <a-statistic title="当前最高价" :value="auction.currentPrice" prefix="¥" />
        <a-statistic title="参与人数" :value="auction.bidders" />
        <a-statistic title="剩余时间" value="2天3小时" />
      </div>

      <a-list header="出价记录">
        <a-list-item v-for="item in auction.bids" :key="item.id">
          <span>{{ item.bidder }}</span>
          <span>¥{{ item.price.toLocaleString() }}</span>
          <span>{{ item.time }}</span>
        </a-list-item>
      </a-list>
    </a-card>

    <!-- 如果用户已提交提案，显示提案状态 -->
    <div v-if="userProposal" class="mt-4 p-4 bg-gray-50 rounded-lg">
      <div class="text-lg font-medium mb-2">您的提案状态</div>
      <a-descriptions bordered>
        <a-descriptions-item label="出价金额">
          ¥{{ formatPrice(userProposal.price) }}
        </a-descriptions-item>
        <a-descriptions-item label="付款方式">
          {{ userProposal.paymentMethod }}
        </a-descriptions-item>
        <a-descriptions-item label="提交时间">
          {{ userProposal.submitTime }}
        </a-descriptions-item>
        <a-descriptions-item label="当前状态">
          <a-tag :color="getStatusColor(userProposal.status)">
            {{ getStatusText(userProposal.status) }}
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>
      
      <!-- 提案被淘汰时显示的提示 -->
      <a-alert
        v-if="userProposal.status === 'eliminated'"
        type="warning"
        show-icon
        class="mt-4"
        message="您的提案已被淘汰"
        description="卖家已接受其他买家的提案，您可以继续关注其他房源。"
      />
    </div>

    <!-- 操作区 -->
    <div class="flex justify-center gap-4">
      <a-button type="primary" size="large" @click="handleBid">
        参与竞拍
      </a-button>
      <a-button size="large" @click="handleFavorite">
        <template #icon><heart-outlined /></template>
        收藏
      </a-button>
      <a-button size="large">
        <template #icon><share-alt-outlined /></template>
        分享
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const router = useRouter()

// 静态模拟数据
const auction = ref({
  id: "1",
  title: "现代精装三居室，南北通透",
  images: [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3'
  ],
  startPrice: 2000000,
  deposit: 50000,
  endTime: "2024-04-30 18:00:00",
  area: 120,
  layout: "3室2厅2卫",
  floor: "18/33层",
  address: "北京市朝阳区某某路",
  currentPrice: 2150000,
  bidders: 5,
  status: 'ongoing',
  bids: [
    { id: '1', price: 2150000, time: '2024-03-20 15:30:00', bidder: 'user***789' }
  ]
})

const statusColor = computed(() => {
  switch (auction.value.status) {
    case 'upcoming': return 'blue'
    case 'ongoing': return 'green'
    case 'ended': return 'red'
    default: return 'blue'
  }
})

const statusText = computed(() => {
  switch (auction.value.status) {
    case 'upcoming': return '即将开始'
    case 'ongoing': return '竞拍中'
    case 'ended': return '已结束'
    default: return '未知状态'
  }
})

const handleBid = () => {
  router.push(`/auction/${auction.value.id}/proposal`)
}

const handleFavorite = () => {
  message.success('收藏成功')
}

// 模拟当前用户的提案数据
const userProposal = ref({
  price: 2150000,
  paymentMethod: '全款',
  submitTime: '2024-03-20 15:30:00',
  status: 'pending'  // 可能的状态：pending, accepted, rejected, eliminated
})

// 状态显示工具函数
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
</script>

<style scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 400px;
  line-height: 400px;
  background: #364d79;
  overflow: hidden;
}
</style> 