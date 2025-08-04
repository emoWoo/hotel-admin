<script setup>
import Searchform from '../../components/searchform.vue';
import CustomTabel from '../../components/customTabel.vue';
import { ref } from 'vue';

const showBin = ref(false);

const search=[
    {
        label: 'User Name',
        type: 'input',
    },
    {
        label: 'Phone Number',
        type: 'input',
    },
    {
        label: 'Room Number',
        type: 'input',
    },
    {
        label: 'Ref Number',
        type: 'input',
    },
    {
        label: 'Code',
        type: 'input',
    },
]

const columns = [
    {
        title: 'User Name',
        dataIndex: 'user_name',
        key: 'user_name',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone_number',
        key: 'phone_number',
    },
    {
        title: 'Room Number',
        dataIndex: 'room_number',
        key: 'room_number',
    },
    {
        title: 'Ref Number',
        dataIndex: 'ref_number',
        key: 'ref_number',
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Register Time',
        dataIndex: 'register_time',
        key: 'register_time',
    },
    {
        title: 'Luggage Count',
        dataIndex: 'luggage_count',
        key: 'luggage_count',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
    },

    {
        title: 'Last Updated At',
        dataIndex: 'last_updated_at',
        key: 'last_updated_at',
    },
    {
        title: 'Stored Time',
        dataIndex: 'stored_time',
        key: 'stored_time',
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
    }
]

</script>

<template>
    <a-card title="列表">
        <template #extra>
            <a-space v-if="!showBin">
                <a-button type="link" disabled style="padding: 0;">导出Excel</a-button>
                <a-button type="link" style="padding: 0;">add</a-button>
                <a-button type="link" style="padding: 0;" @click="showBin = true">trash</a-button>
            </a-space>
            <a-space v-else>
                <a-button type="link" style="padding: 0; " @click="showBin = false">back</a-button>
            </a-space>
        </template>
        <Searchform :fields="search" />
        <CustomTabel :columns="columns" :dataSource=[] :showBin="showBin" />
    </a-card>
</template>