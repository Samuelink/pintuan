<template>
  <div class="app-container" :class="{ 'dark-mode': isDark }">
    <header class="main-header" :class="{ 'header-scrolled': isScrolled }">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>拍卖平台</h1>
        </router-link>
        <nav class="main-nav">
          <router-link to="/" class="nav-link">首页</router-link>
          <div class="theme-toggle" @click="toggleDark()">
            <i-icon :icon="isDark ? 'ph:sun-bold' : 'ph:moon-bold'" />
          </div>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="main-footer">
      <div class="footer-content">
        <p>&copy; 2024 拍卖平台. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;

  &.dark-mode {
    --bg-color: #121212;
    --text-color: #ffffff;
    --header-bg: rgba(18, 18, 18, 0.8);
    --card-bg: #1e1e1e;
    --border-color: #333;
  }

  --bg-color: #ffffff;
  --text-color: #333333;
  --header-bg: rgba(255, 255, 255, 0.8);
  --card-bg: #ffffff;
  --border-color: #eaeaea;
}

.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--header-bg);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;

  &.header-scrolled {
    border-bottom: 1px solid var(--border-color);
  }
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
  color: inherit;
  
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
}

.main-nav {
  display: flex;
  gap: 2rem;
  align-items: center;

  .nav-link {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
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

.main-content {
  flex: 1;
  margin-top: 4rem;
  padding: 2rem;
}

.main-footer {
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  padding: 2rem;
  margin-top: auto;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .header-content {
    padding: 1rem;
  }

  .main-content {
    padding: 1rem;
  }
}
</style> 