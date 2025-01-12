<template>
  <div class="admin-layout">
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <h2>管理后台</h2>
        </div>
        <el-menu
          default-active="1"
          class="el-menu-vertical"
          :router="true"
        >
          <el-menu-item index="/admin">
            <i-icon icon="ph:chart-line" />
            <span>仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/admin/proposals">
            <i-icon icon="ph:list-bullets" />
            <span>提案管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-right">
            <div class="theme-toggle" @click="toggleDark()">
              <i-icon :icon="isDark ? 'ph:sun-bold' : 'ph:moon-bold'" />
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { ElContainer, ElAside, ElHeader, ElMain, ElMenu, ElMenuItem } from 'element-plus'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped>
.admin-layout {
  min-height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);

  .el-container {
    min-height: 100vh;
  }

  .el-aside {
    background: var(--card-bg);
    border-right: 1px solid var(--border-color);

    .logo {
      padding: 1rem;
      text-align: center;
      border-bottom: 1px solid var(--border-color);

      h2 {
        margin: 0;
        font-size: 1.25rem;
      }
    }
  }

  .el-header {
    background: var(--card-bg);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 1rem;

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .theme-toggle {
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.2s;

      &:hover {
        background: var(--border-color);
      }
    }
  }

  .el-menu {
    border-right: none;
    background: var(--card-bg);
  }

  .el-menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

:deep(.el-menu) {
  --el-menu-bg-color: var(--card-bg);
  --el-menu-text-color: var(--text-color);
  --el-menu-hover-bg-color: var(--border-color);
  --el-menu-active-color: var(--primary-color);
}
</style> 