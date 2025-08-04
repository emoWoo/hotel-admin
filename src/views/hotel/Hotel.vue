<script setup>
import { ref, onMounted, reactive } from 'vue';
import Searchform from '../../components/searchform.vue';
import CustomTabel from '../../components/customTabel.vue';
import CustomAddModal from '../../components/customAddModal.vue';
import CustomEditModal from '../../components/customEditModal.vue';
import fetchHotels from '../../utils/fetchHotels';
import { message } from 'ant-design-vue';
import CustomView from '../../components/customView.vue';
import hotelApi from '../../api/hotel';

const showBin = ref(false);

const search = [
    {
        label: '酒店名字',
        type: 'input',

    },
    {
        label: '酒店地址',
        type: 'input',
    },
]
const columns = [
    {
        title: '酒店名字',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '酒店地址',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
    }
]

const modalItems = [
    {
        label: '酒店名字',
        name: 'name',
        type: 'input',
        placeholder: '酒店名字',
        rules: [{ required: true, message: '不能为空' }]
    },
    {
        label: '酒店地址',
        name: 'location',
        type: 'input',
        placeholder: '酒店地址',
        rules: [{ required: true, message: '不能为空' }]
    },
]

const showAddModal = ref(false)
const showEditModal = ref(false)

const hotelList = ref([])

const currentEditRecord = ref({});
function openEdit(record) {
    currentEditRecord.value = { ...record };
    // console.log('Editing record:', currentEditRecord.value);
    showEditModal.value = true;
}
async function handleEdit(data) {
    try {
        await hotelApi.editHotel(data);
        showEditModal.value = false;
        message.success('编辑成功');
        await getHotels();
    } catch (error) {
        message.error('编辑失败: ' + error.message);
        return;
    }

}
async function handleAdd(data) {
    try {
        await hotelApi.addHotel(data);
        message.success('添加成功');
        showAddModal.value = false;
        await getHotels();
    } catch (error) {
        message.error('添加失败: ' + error.message);
    }
}

const isView = ref(false)
const viewData = ref([])
function openView(record) {
    viewData.value = [
        { label: '酒店名字', value: record.name },
        { label: '酒店地址', value: record.location },
    ]
    isView.value = true
}

async function softDelete(record) {
    const hotelId = record.hotel_id_1;
    try {
        await hotelApi.softDelete({ hotel_id_1: hotelId });
        message.success('删除成功');
        await getHotels();
    } catch (error) {
        message.error('删除失败: ' + error.message);
    }
}

async function trashHotels() {
    showBin.value = true;
    await getHotels();
}

async function back() {
    showBin.value = false;
    await getHotels();
}

async function restore(record) {
    // console.log('Restoring hotel:', record);
    const hotelId = record.hotel_id_1;
    try {
        await hotelApi.restoreHotel({ hotel_id_1: hotelId });
        await getHotels();
        message.success('恢复成功');
    } catch (error) {
        message.error('恢复失败: ' + error.message);
        return;
    }
}

async function permanentDelete(record) {
    // console.log('Permanently deleting hotel:', record);
    const hotelId = record.hotel_id_1;
    try {
        await hotelApi.permanentDelete({ hotel_id_1: hotelId });
        message.success('永久删除成功');
        await getHotels();
    } catch (error) {
        message.error('永久删除失败: ' + error.message);
        return;
    }
}

async function getHotels() {
    try {
        if (showBin.value) {
            const res = await hotelApi.getTrashHotels();
            const data = res.data.hotels
            console.log('Trashed Hotels:', data);
            hotelList.value = data.map(item => ({
                hotel_id_1: item.Hotel_id,
                name: item.Hotel_name,
                location: item.Hotel_location,
            }))
        }
        else {
            hotelList.value = await fetchHotels();
        }
    } catch (error) {
        message.error(err)
    }
}

onMounted(async () => {
    await getHotels();
})
</script>

<template>
    <a-card title="列表">
        <template #extra>
            <a-space v-if="!showBin">
                <a-button type="link" disabled style="padding: 0;">导出Excel</a-button>
                <a-button type="link" style="padding: 0;" @click="showAddModal = true">添加</a-button>
                <a-button type="link" style="padding: 0;" @click="trashHotels">回收站</a-button>
            </a-space>
            <a-space v-else>
                <a-button type="link" style="padding: 0; " @click="back">back</a-button>
            </a-space>
        </template>
        <Searchform :fields="search" />
        <CustomTabel :columns="columns" :dataSource="hotelList" :showBin="showBin" @edit="openEdit" @view="openView"
            @delete="softDelete" @restore="restore" @permanent_delete="permanentDelete"/>
        <CustomAddModal :visible="showAddModal" :items="modalItems" @save="handleAdd" @cancel="showAddModal = false" />
        <CustomEditModal :visible="showEditModal" :items="modalItems" @save="handleEdit"
            :initialValues="currentEditRecord" @cancel="showEditModal = false" />
        <CustomView :visible="isView" @close="isView = false" :infos="viewData" />
    </a-card>
</template>