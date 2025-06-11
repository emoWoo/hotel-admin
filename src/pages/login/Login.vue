<script setup>
import { reactive } from 'vue'
import { UserOutlined, LockOutlined, TranslationOutlined } from '@ant-design/icons-vue'
import LangSelector from '../../components/langSelector.vue'
import ThemeSwitch from '../../components/themeSwitch.vue'

const form = reactive({
    username: '',
    password: '',
})

const onFinish = () => {
    message.success(`欢迎，${form.username}！`)
    // TODO: 调用登录接口
}
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            <div class="title">hotel-admin</div>
            <a-form :model="form" @finish="onFinish" layout="vertical" class="login-form">
                <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
                    <a-input v-model:value="form.username" placeholder="用户名">
                        <template #prefix>
                            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
                    <a-input-password v-model:value="form.password" placeholder="密码">
                        <template #prefix>
                            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" block>登录</a-button>
                </a-form-item>
            </a-form>
        </div>

        <div class="langselect">
            <span class="lang-label">Language</span>
            <LangSelector />
        </div>

        <div>
            <ThemeSwitch />
        </div>



    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: #f0f2f5;
}

.login-card {
    width: 360px;
}

.title {
    font-size: xx-large;
    font-weight: bolder;
    text-align: center;
}

.login-form {
    margin-top: 16px;
}

.langselect {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    gap: 8px;
    color: #999;
    font-size: 14px;
}

.lang-label {
    font-size: 14px;
    color: #999;
}
</style>