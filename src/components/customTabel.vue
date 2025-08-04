<script setup>
import getConfirmTitle from '../utils/getConfirmTitle'
const props = defineProps({
    columns: {
        type: Array,
        required: true
    },
    dataSource: {
        type: Array,
        required: true
    },
    actions: {
        type: Array,
        default: [
            { label: '查看', value: 'view', danger: false },
            { label: '编辑', value: 'edit', danger: false },
            { label: '删除', value: 'delete', danger: true },
        ]
    },
    trash_actions: {
        type: Array,
        default: [
            { label: '恢复', value: 'restore', danger: false },
            { label: '永久删除', value: 'permanent_delete', danger: true },
        ]
    },
    showBin: {
        type: Boolean,
    }
})

const emit = defineEmits(['update:showBin', 'view', 'edit', 'delete', 'restore', 'permanent_delete'])
function emitAction(action, record) {
    if (action === 'view') {
        emit('view', record)
    } else if (action === 'edit') {
        emit('edit', record)
    } else if (action === 'delete') {
        emit('delete', record, false)
    } else if (action === 'restore') {
        emit('restore', record, false)
    } else if (action === 'permanent_delete') {
        emit('permanent_delete', record, true)
    }
}

</script>

<template>
    <a-row>
        <a-col :span="24">
            <a-table :columns=props.columns :data-source=props.dataSource :scroll="{ x: 'max-content' }">
                <template #bodyCell="{ column, record }">
                    <span v-if="column.key === 'actions'">
                        <a-space>
                            <template v-for="(action, i) in props.showBin ? props.trash_actions : props.actions"
                                :key="i">
                                <a-popconfirm v-if="['delete', 'permanent_delete', 'restore'].includes(action.value)"
                                    :title="getConfirmTitle(action.value)" :ok-text="$t('user.yes')"
                                    :cancel-text="$t('user.no')" @confirm="() => emitAction(action.value, record)">
                                    <a-button :danger="action.danger" type="link" style="padding: 0;">
                                        {{ action.label }}
                                    </a-button>
                                </a-popconfirm>

                                <a-button v-else type="link" style="padding: 0;"
                                    @click="emitAction(action.value, record)">
                                    {{ action.label }}
                                </a-button>
                            </template>
                        </a-space>
                    </span>
                </template>
            </a-table>
        </a-col>
    </a-row>
</template>