<template>
  <div class="max-w-3xl mx-auto p-4">
    <a-card title="提交竞拍提案" class="mb-4">
      <a-form
        :model="formState"
        layout="vertical"
        @finish="handleSubmit"
      >
        <a-form-item
          label="出价金额"
          name="price"
          :rules="[{ required: true, message: '请输入出价金额' }]"
        >
          <a-input-number
            v-model:value="formState.price"
            :min="1"
            style="width: 100%"
            prefix="¥"
          />
        </a-form-item>

        <a-form-item
          label="付款方式"
          name="paymentMethod"
          :rules="[{ required: true, message: '请选择付款方式' }]"
        >
          <a-select v-model:value="formState.paymentMethod">
            <a-select-option value="full">全款</a-select-option>
            <a-select-option value="mortgage">按揭</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="计划付款时间"
          name="paymentDate"
          :rules="[{ required: true, message: '请选择计划付款时间' }]"
        >
          <a-date-picker 
            v-model:value="formState.paymentDate"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item
          label="附加说明"
          name="description"
        >
          <a-textarea 
            v-model:value="formState.description"
            :rows="4"
          />
        </a-form-item>

        <a-form-item
          label="购房资格证明"
          name="qualification"
        >
          <a-upload-dragger
            v-model:fileList="fileList"
            :multiple="true"
            action="/upload"
            @change="handleChange"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined />
            </p>
            <p class="ant-upload-text">点击或拖拽文件上传</p>
          </a-upload-dragger>
        </a-form-item>

        <!-- 保证金状态显示 -->
        <a-card class="mb-4">
          <div class="flex justify-between items-center">
            <span>保证金状态</span>
            <span :class="isPaid ? 'text-green-500' : 'text-red-500'">
              {{ isPaid ? '已支付' : '未支付' }}
            </span>
          </div>
        </a-card>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            提交提案
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { InboxOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'

const router = useRouter()
const isPaid = ref(false)
const fileList = ref([])

const formState = reactive({
  price: undefined,
  paymentMethod: undefined,
  paymentDate: undefined,
  description: '',
})

const handleSubmit = (values) => {
  if (!isPaid.value) {
    Modal.confirm({
      title: '支付保证金',
      content: '点击确认将模拟支付保证金（演示用）',
      onOk: () => {
        isPaid.value = true
        message.success('保证金支付成功')
      },
    })
    return
  }

  message.success('提案提交成功')
  router.push('/auction/1')
}

const handleChange = (info) => {
  const { status } = info.file
  if (status === 'done') {
    message.success(`${info.file.name} 文件上传成功`)
  } else if (status === 'error') {
    message.error(`${info.file.name} 文件上传失败`)
  }
}
</script> 