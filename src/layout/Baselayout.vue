<template>
    <ALayout style="min-height: 100vh;background: #fff;">
        <ALayoutSider style="background: #fff;height: 100vh; position:sticky; top: 0; overflow: auto;"
            v-model:collapsed="collapsed">
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
                <a-menu-item key="/dashboard">
                    <router-link to="/dashboard">
                        <DashboardOutlined />
                        <span>{{ $t('dashboard.dashboard') }}</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="/usrinfo">
                    <router-link to="/usrinfo">
                        <InfoCircleOutlined />
                        <span>{{ $t('usrinfo.title') }}</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="/user">
                    <router-link to="/user">
                        <UserOutlined />
                        <span>{{ $t('user.title') }}</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="/hotel">
                    <router-link to="/hotel">
                        <HomeOutlined />
                        <span>{{ $t('hotel.title') }}</span>
                    </router-link>
                </a-menu-item>
                <!-- <a-menu-item key="/tag">
                    <router-link to="/tag">
                        <TagOutlined />
                        <span>{{ $t('tag.title') }}</span>
                    </router-link>
                </a-menu-item> -->
                <a-menu-item key="/deposit">
                    <router-link to="/deposit">
                        <HddOutlined />
                        <span>{{ $t('deposit.title') }}</span>
                    </router-link>
                </a-menu-item>
            </a-menu>

        </ALayoutSider>
        <a-layout>
            <a-layout-header class="header">
                <a-space>
                    <langSelector />
                    <themeSwitch />
                </a-space>
            </a-layout-header>
            <a-layout-content>
                <div :style="{ height: '64px', background: '#fff', padding: '8px 16px' }">
                    <a-breadcrumb>
                        <a-breadcrumb-item>{{ $t('dashboard.home') }}</a-breadcrumb-item>
                        <a-breadcrumb-item>{{ currentTitle }}</a-breadcrumb-item>
                    </a-breadcrumb>
                    <div class="breadcrumbtitle">{{ currentTitle }}</div>
                </div>
                <a-watermark class="full-page" content="NearLink">
                    <div :style="{ margin: '16px 16px' }">
                        <router-view />
                    </div>
                </a-watermark>
            </a-layout-content>
        </a-layout>
    </ALayout>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { DashboardOutlined, HomeOutlined, InfoCircleOutlined, UserOutlined, TagOutlined, HddOutlined } from '@ant-design/icons-vue';
import langSelector from '../components/langSelector.vue';
import themeSwitch from '../components/themeSwitch.vue';
import { useI18n } from 'vue-i18n';

const route = useRoute()
const router = useRouter();
const { t } = useI18n()

const currentTitle = ref('')

watch(
    () => route.fullPath,
    () => {
        const titleKey = route.meta.title || ''
        currentTitle.value = titleKey ? t(titleKey) : '';
        localStorage.setItem('lastPath', route.fullPath);
    },
    { immediate: true }
)
const collapsed = ref(false);
const selectedKeys = ref([route.path]);
watch(
    () => route.path,
    (newPath) => {
        selectedKeys.value = [newPath]
    },
    { immediate: true }
)

onMounted(() => {
    const lastPath = localStorage.getItem('lastPath');
    if (lastPath && lastPath !== route.fullPath) {
        router.replace(lastPath); 
    } else if (!lastPath && route.path !== '/dashboard') {
        router.replace('/dashboard');
    }
});
</script>

<style scoped>
.logo {
    height: 64px;

    background: rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
}

.header {
    background: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid #d9d9d9;
}

.breadcrumbtitle {
    margin-top: 4px;
    font-size: 20px;
    font-weight: bold;
}

.site-layout .site-layout-background {
    background: #fff;
}
</style>