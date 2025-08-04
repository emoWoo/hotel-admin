<script setup>

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    visible: {
        type: Boolean,
        default: false
    },
    infos: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['close'])
</script>

<template>
    <a-modal :open="props.visible" title="详情" @cancel="emit('close')">
        <template #footer>
            <a-button @click="emit('close')">取消</a-button>
        </template>
        <a-descriptions bordered :column="1">
            <a-descriptions-item v-for="info in props.infos" :label="info.label">{{ info.value }}</a-descriptions-item>
        </a-descriptions>
    </a-modal>
</template>