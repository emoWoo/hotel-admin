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
    },
    layout: {
        type: String,
        default: 'horizontal',
    },
    title: {
        type: String,
        default: '详情'
    },
    column_num: {
        type: Number,
        default: 1
    },
    datatype: {
        type: String,
        default: 'text'
    }
})

const emit = defineEmits(['close'])
</script>

<template>
    <a-modal :open="props.visible" :title=props.title @cancel="emit('close')">
        <template #footer>
            <a-button @click="emit('close')">取消</a-button>
        </template>
        <a-descriptions bordered :column=props.column_num :layout="props.layout">
            <a-descriptions-item v-if="props.datatype === 'image'" v-for="info in props.infos" :label="info.label">
                <div v-for="(img, idx) in info.value" :key="idx">
                    <img :src="img" style="max-width: 200px; margin-bottom: 8px;" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item v-else v-for="info in props.infos" :key="info.label" :label="info.label">
                <template v-if="Array.isArray(info.value)">
                    <div v-for="(item, idx) in info.value" :key="idx" style="margin-bottom: 6px;">
                        {{ item }}
                    </div>
                </template>
                <template v-else>
                    {{ info.value }}
                </template>
            </a-descriptions-item>
        </a-descriptions>
    </a-modal>
</template>