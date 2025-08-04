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
})

const title = '添加'

const formRef = ref()
const formData = reactive({})
watch(
    () => props.items,
    (newItems) => {
        newItems.forEach(item => {
            // 初始化为空或初始值
            formData[item.name] = ''
        })
    },
    { immediate: true }
)

// 点击“确定”时将表单数据传给父组件
const handleOk = async () => {
    try {
        await formRef.value.validate()

        emit('save', { ...formData })

        Object.keys(formData).forEach(key => {
            formData[key] = ''
        })
    } catch (error) {
        return;
    }

}
const emit = defineEmits(['cancel', 'save'])
</script>

<template>
    <a-modal :title="title" :open="props.visible" @ok="handleOk" @cancel="emit('cancel')">
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