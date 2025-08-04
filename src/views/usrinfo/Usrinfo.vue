<script setup>
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import userApi from '../../api/user'
import fetchHotels from '../../utils/fetchHotels'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const hotels = ref([])

const formRef = ref()
const formData = reactive({
    name: '',
    email: '',
    hotel_id: '',
})
console.log(formData)

const save = () => {
    formRef.value
        .validate()
        .then(() => {
            userApi.updateUserInfo(formData)
                .then(res => {
                    console.log(res.data)
                    message.success(t('usrinfo.save_success'))
                })
                .catch(err => {
                    console.error(err)
                    message.error(t('usrinfo.save_failed'))
                })
        })
        .catch(() => {
            message.error(t('usrinfo.please_input_complete_info'))
        })
}

onMounted(async () => {
    const data = await fetchHotels();
    hotels.value = data.map(item => ({
        label: item.name,
        value: item.hotel_id_1,
    }))
    try {
        const res = await userApi.getUserInfo()
        console.log('User Info:', res.data)
        const userInfo = res.data
        formData.name = userInfo.name
        formData.email = userInfo.email
        formData.hotel_id = userInfo.hotel_id
        console.log(res.data)
    } catch (error) {
        message.error(t('usrinfo.get_usrinfo_error'))
    }
})
</script>

<template>
    <a-card :title="$t('usrinfo.title')">
        <template #extra>
            <AButton type="primary" @click="save">
                {{ $t('usrinfo.save') }}
            </AButton>
        </template>
        <a-row>
            <a-col :span="24">
                <a-form layout="vertical" :model="formData" ref="formRef">
                    <a-form-item :label="$t('usrinfo.name')" name="name"
                        :rules="[{ required: true, message: $t('usrinfo.please_input_name') }]">
                        <a-input v-model:value="formData.name" style="max-width: 300px;" />
                    </a-form-item>
                    <a-form-item :label="$t('usrinfo.email')" name="email"
                        :rules="[{ required: true, message:$t('usrinfo.please_input_email') }]">
                        <a-input v-model:value="formData.email" style="max-width: 300px;" />
                    </a-form-item>
                    <a-form-item name="hotel_id" :label="$t('usrinfo.owe_hotel')"
                        :rules="[{ required: true, message: $t('usrinfo.please_select_hotel') }]">
                        <a-select v-model:value="formData.hotel_id" :options=hotels style="max-width: 300px;" />
                    </a-form-item>

                </a-form>
            </a-col>
        </a-row>
    </a-card>
</template>