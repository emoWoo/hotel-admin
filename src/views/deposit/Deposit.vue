<script setup>
import Searchform from '../../components/searchform.vue';
import CustomTabel from '../../components/customTabel.vue';
import CustomView from '../../components/customView.vue';
import { ref, onMounted } from 'vue';
import depositApi from '../../api/deposit';
import { message } from 'ant-design-vue';
import formatTimestamp from '../../utils/formatTime';
import formatSecondsToHMS from '../../utils/formatSecondsToHMS';

const showBin = ref(false);

const search = [
    {
        label: '用户名',
        type: 'input',
    },
    {
        label: '电话号码',
        type: 'input',
    },
    {
        label: '房间号',
        type: 'input',
    },
]

const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '电话号码',
        dataIndex: 'phone_number',
        key: 'phone_number',
    },
    {
        title: '房间号',
        dataIndex: 'room_number',
        key: 'room_number',
    },
    {
        title: '取件码',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: '注册时间',
        dataIndex: 'register_time',
        key: 'register_time',
    },
    {
        title: '行李数量',
        dataIndex: 'luggage_count',
        key: 'luggage_count',
    },
    {
        title: '行李类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },

    {
        title: '最后更新时间',
        dataIndex: 'last_updated_time',
        key: 'last_updated_time',
    },
    {
        title: '已存放时间',
        dataIndex: 'stored_time',
        key: 'stored_time',
    },
    {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
    }
]

const actions = [
    {
        label: '详情',
        value: 'detail'
    },
    {
        label: '图片',
        value: 'photo'

    },
    {
        label: '行李',
        value: 'luggage'
    }
]

const listData = ref([])
const isDetail = ref(false);
const detailData = ref([])
async function checkDetail(record) {
    console.log('Viewing record:', record);
    detailData.value = [
        { label: '用户名字', value: record.username },
        { label: '手机号', value: record.phone_number },
        { label: '房间号', value: record.room_number },
        { label: '行李数量', value: record.luggage_count },
        { label: '行李类型', value: record.type },
        { label: '状态', value: record.status },
        { label: '登记时间', value: record.register_time },
        { label: '最后更新时间', value: record.last_updated_time },
        { label: '存放时长', value: record.stored_time },
        { label: '取件码', value: record.code }
    ]
    isDetail.value = true;
}

const isphotos = ref(false);
const images_urls = ref([])
async function checkPhoto(record) {
    console.log('Viewing record:', record.images);
    const data = record.images
    if (data) {
        images_urls.value = [
            {
                'label': '图片',
                'value': data.map(i => i.path)
            }
        ]
        console.log(images_urls.value[0].value)
    }
    isphotos.value = true;
}

const isluggage = ref(false);
const luggageData = ref([])
async function checkLuggage(record) {
    const data = record.luggage
    if (data) {
        luggageData.value = [
            {
                'label': '标签',
                'value': data.map(i => i.tag_name)
            },
            {
                'label': '房间',
                'value': data.map(i => i.room_name)
            }
        ]
    }
    isluggage.value = true;
}

async function fetchDepositinfos() {
    try {
        const res = await depositApi.getDepositList();
        const data = res.data?.lists
        listData.value = data.map(item => ({
            username: item.owner_name,
            phone_number: item.owner_phone_number,
            room_number: item.room_number,
            code: item.list_id,
            register_time: formatTimestamp(item.time),
            luggage_count: item.counts,
            type: item.list_type,
            status: item.list_status === 1 ? '未出库' : '已出库',
            last_updated_time: item.update_time === 0 ? '/' : formatTimestamp(item.update_time),
            stored_time: formatSecondsToHMS(item.stored_time),
            luggage: item.luggage || [],
            images: item.image_urls || []
        }))
        console.log('Fetched deposit list:', listData.value);
    } catch (error) {
        message.error('Failed to fetch deposit list: ' + error.message);
    }
}

onMounted(async () => {
    await fetchDepositinfos();
});
</script>

<template>
    <a-card title="列表">
        <template #extra>
            <a-space v-if="!showBin">
                <a-button type="link" disabled style="padding: 0;">导出Excel</a-button>
            </a-space>
        </template>
        <Searchform :fields="search" />
        <CustomTabel :columns="columns" :dataSource=listData :actions="actions" @detail="checkDetail"
            @photo="checkPhoto" @luggage="checkLuggage" />
        <CustomView :visible="isDetail" @close="isDetail = false" :infos="detailData" />
        <CustomView :visible="isphotos" @close="isphotos = false" :title="'图片'" :datatype="'image'" :layout="'vertical'"
            :column_num="1" :infos="images_urls" />
        <CustomView :visible="isluggage" @close="isluggage = false" :title="'行李'" :column_num="2" :layout="'vertical'"
            :infos="luggageData" />
    </a-card>
</template>