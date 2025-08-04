<script setup>
import { ref, reactive } from 'vue'
import { UserOutlined, LockOutlined, TranslationOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import LangSelector from '../../components/langSelector.vue'
import ThemeSwitch from '../../components/themeSwitch.vue'
import auth from '../../api/auth'
import { useRouter } from 'vue-router'
import {useUserStore} from '../../store/userStore'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
    // email: 'admin',
    // password: 'admin',
    email:'admin@example.com',
    password: 'admin123',
})

const loading = ref(false)
const login = async () => {
    loading.value = true
    try {
        const res = await auth.login(form)
        // console.log('Login response:', res)

        userStore.userInfo = res.data.user

        const token = res.data.token
        localStorage.setItem('token', token)

        message.success('Login successful')
        await router.push('/dashboard')
        loading.value = false
    } catch (err) {
        console.log(err.response.data)
        const response = err.response.data
        const code = err.response.data.code
        switch (code) {
            case 4031:
                message.error('Incorrect email or password')
                break
            case 4291:
                message.error('Too many login failed attempts, please try again later')
                break
            case 4033:
                message.error('User is banned')
                break
            default:
                message.error(response.message ?? 'Server error')
                break
        }
    }
}
</script>

<template>
    <a-watermark class="full-page" content="emoWoo hotel admin">
        <div class="login-container">
            <div class="login-card">
                <div class="title">hotel-admin</div>
                <a-form :model="form" @finish="login" layout="vertical" class="login-form">
                    <a-form-item :label="$t('login.email')" name="email" :rules="[{ required: true, message: $t('login.please_input_email') }]">
                        <a-input v-model:value="form.email" :placeholder="$t('login.email')">
                            <template #prefix>
                                <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item :label="$t('login.password')" name="password" :rules="[{ required: true, message: $t('login.please_input_password') }]">
                        <a-input-password v-model:value="form.password" :placeholder="$t('login.password')">
                            <template #prefix>
                                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" block :loading="loading">{{ $t('login.login') }}</a-button>
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
    </a-watermark>
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