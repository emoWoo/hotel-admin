<script setup>

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    userinfo: {
        type: Object,
        default: () => ({})
    }
})
const emit = defineEmits(['close'])
</script>

<template>
    <a-modal :open="props.visible" :title="$t('user.view')" @cancel="emit('close')">
        <a-descriptions bordered :column="1">
            <a-descriptions-item :label="$t('user.name')">{{ userinfo.name }}</a-descriptions-item>
            <a-descriptions-item :label="$t('user.email')">{{ userinfo.email }}</a-descriptions-item>
            <a-descriptions-item :label="$t('user.owe_hotel')">{{ userinfo.hotel }}</a-descriptions-item>
            <a-descriptions-item :label="$t('user.group')">{{ userinfo.group }}</a-descriptions-item>
            <a-descriptions-item :label="$t('user.status')">{{ userinfo.status }}</a-descriptions-item>
            <a-descriptions-item :label="$t('user.last_active')">{{ userinfo.last_active }}</a-descriptions-item>
            <a-descriptions-item :label="$t('user.created_at')">{{ userinfo.created_at }}</a-descriptions-item>
            <a-descriptions-item :label="$t('user.updated_at')">{{ userinfo.updated_at }}</a-descriptions-item>
        </a-descriptions>
        <template #footer>
            <a-button type="primary" @click="emit('close')">{{ $t('user.know') }}</a-button>
        </template>
    </a-modal>
</template>