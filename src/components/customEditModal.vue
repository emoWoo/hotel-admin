<script setup>
import { ref, reactive, watch } from 'vue';
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    items: {
        type: Array,
        default: () => []
    },
    initialValues: {
        type: Object,
        default: () => ({})
    }
})

const title = '编辑'
const emit = defineEmits(['cancel', 'save'])

const formRef = ref()
const formData = reactive({})
watch(() => props.initialValues, (newVal) => {
    for (const key in newVal) {
        formData[key] = newVal[key]
    }
}, { immediate: true })
async function handleOk() {
    try {
        await formRef.value.validate()
        emit('save', { ...formData }) // 把表单内容传出去
    } catch (error) {
        return; // 如果验证失败，直接返回
    }
}
async function handleCancel() {
    formRef.value?.resetFields(); // 重置校验状态
    Object.keys(formData).forEach(key => formData[key] = '') // 清空数据
    emit('cancel')
}
</script>

<template>
    <a-modal :title="title" :open="props.visible" @ok="handleOk" @cancel="handleCancel">
        <a-form ref="formRef" layout="vertical" :model="formData">
            <a-form-item v-for="item in props.items" :key="item.name" :label="item.label" :name="item.name"
                :rules="item.rules">
                <a-input v-if="item.type === 'input'" v-model:value="formData[item.name]"
                    :placeholder="item.placeholder" />
                <a-select v-else-if="item.type === 'select'" v-model:value="formData[item.name]"
                    :options="item.options" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>