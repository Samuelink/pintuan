<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- 顶部导航 -->
    <nav class="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-100">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          房产竞拍
        </div>
        <div class="flex items-center space-x-4">
          <a-button type="link" @click="router.push('/seller/auctions/1/proposals')">
            <template #icon><UserOutlined /></template>
            卖家管理
          </a-button>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域，添加上边距避免被导航栏遮挡 -->
    <div class="container mx-auto px-4 pt-20 pb-8">
      <!-- 房产列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a-card 
          v-for="house in houses" 
          :key="house.id" 
          hoverable 
          class="w-full"
          @click="goToDetail(house.id)"
        >
          <img 
            :alt="house.title" 
            :src="house.image" 
            class="w-full h-48 object-cover mb-4"
          />
          <a-card-meta :title="house.title">
            <template #description>
              <div class="space-y-2">
                <p class="text-lg font-semibold text-red-500">
                  起拍价：¥{{ house.startPrice.toLocaleString() }}
                </p>
                <p>{{ house.layout }} | {{ house.area }}㎡</p>
                <div class="flex justify-between items-center">
                  <a-tag :color="getStatusColor(house.status)">
                    {{ getStatusText(house.status) }}
                  </a-tag>
                  <span class="text-gray-500">
                    {{ house.bidders }}人参与
                  </span>
                </div>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </div>

      <!-- 底部分页 -->
      <div class="mt-8 flex justify-center">
        <a-pagination 
          v-model:current="currentPage" 
          :total="50" 
          show-size-changer 
          show-quick-jumper
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const currentPage = ref(1)

// 模拟房产数据
const houses = ref([
  {
    id: '1',
    title: '现代精装三居室，南北通透',
    image: 'https://picsum.photos/800/600?random=1',
    startPrice: 2000000,
    layout: '3室2厅2卫',
    area: 120,
    status: 'ongoing',
    bidders: 5
  },
  {
    id: '2',
    title: '豪华江景四居室',
    image: 'https://picsum.photos/800/600?random=2',
    startPrice: 3500000,
    layout: '4室2厅2卫',
    area: 160,
    status: 'upcoming',
    bidders: 0
  },
  {
    id: '3',
    title: '市中心商圈两居室',
    image: 'https://picsum.photos/800/600?random=3',
    startPrice: 1800000,
    layout: '2室1厅1卫',
    area: 89,
    status: 'ended',
    bidders: 8
  },
  {
    id: '4',
    title: '花园洋房带露台',
    image: 'https://picsum.photos/800/600?random=4',
    startPrice: 4200000,
    layout: '5室3厅3卫',
    area: 220,
    status: 'ongoing',
    bidders: 3
  },
  {
    id: '5',
    title: '地铁口学区房',
    image: 'https://picsum.photos/800/600?random=5',
    startPrice: 1500000,
    layout: '2室2厅1卫',
    area: 98,
    status: 'upcoming',
    bidders: 0
  },
  {
    id: '6',
    title: '复式楼中楼',
    image: 'https://picsum.photos/800/600?random=6',
    startPrice: 2800000,
    layout: '4室2厅2卫',
    area: 180,
    status: 'ongoing',
    bidders: 6
  }
])

const getStatusColor = (status) => {
  switch (status) {
    case 'upcoming': return 'blue'
    case 'ongoing': return 'green'
    case 'ended': return 'red'
    default: return 'default'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'upcoming': return '即将开始'
    case 'ongoing': return '竞拍中'
    case 'ended': return '已结束'
    default: return '未知状态'
  }
}

const goToDetail = (id) => {
  router.push(`/auction/${id}`)
}
</script>

<style scoped>
.ant-card {
  cursor: pointer;
  transition: all 0.3s;
}

.ant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 添加导航栏样式 */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}
</style> 