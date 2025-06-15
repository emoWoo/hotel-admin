<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    userData: {
        type: Object,
        default: () => ({})
    },
    hotelOptions: { type: Array },
    groupOptions: { type: Array },
    statusOptions: { type: Array },
})

const emit = defineEmits(['close', 'save'])

const formRef = ref()
const formData = reactive({
    username: '',
    password: '',
    email: '',
    hotel: '',
    group: '',
    status: '',
})

watch(() => props.userData,
    (val) => {
        Object.assign(formData, val) || {}
    },
    { immediate: true }
)

const handleCancel = () => {
    emit('close', false)
    formRef.value.resetFields()
}

const handleComfirm = async () => {
    const handleData = {
        id: props.userData.id,
        email: formData.email,
        name: formData.name,
        password: formData.password,
        hotel_id: formData.hotel,
        user_group_id: formData.group,
        status: formData.status,
    }
    try {
        await formRef.value.validate()
        emit('save', { ...handleData })
        emit('close', false)
    } catch {
        message.error(t('user.compelete_information'))
    }
}

</script>

<template>
    <a-modal :open="visible" :title="isEdit ? $t('user.edit') : $t('user.add')" @ok="handleComfirm"
        @cancel="handleCancel">
        <a-form layout="vertical" ref="formRef" :model="formData">
            <a-form-item :label="$t('user.name')" name="name"
                :rules="[{ required: true, message: $t('user.form_validation.name_required') }]">
                <a-input v-model:value="formData.name" />
            </a-form-item>

            <a-form-item :label="$t('user.password')" name="password"
                :rules="isEdit ? [] : [{ required: true, message: $t('user.form_validation.password_required') }]">
                <a-input-password v-model:value="formData.password" />
            </a-form-item>

            <a-form-item :label="$t('user.email')" name="email"
                :rules="[{ required: true, message: $t('user.form_validation.email_required') }]">
                <a-input v-model:value="formData.email" />
            </a-form-item>

            <a-form-item :label="$t('user.owe_hotel')" name="hotel"
                :rules="[{ required: true, message: $t('user.form_validation.hotel_required') }]">
                <a-select v-model:value="formData.hotel" :options="hotelOptions || []" />
            </a-form-item>

            <a-form-item :label="$t('user.group')" name="group"
                :rules="[{ required: true, message: $t('user.form_validation.group_required') }]">
                <a-select v-model:value="formData.group" :options="groupOptions || []" />
            </a-form-item>

            <a-form-item :label="$t('user.status')" name="status"
                :rules="[{ required: true, message: $t('user.form_validation.status_required') }]">
                <a-select v-model:value="formData.status" :options="statusOptions || []" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>