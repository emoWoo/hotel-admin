<script setup>
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue'
import userListApi from '../../api/userList'
import formatTime from '../../utils/formatTime'
import { useI18n } from 'vue-i18n'
import Searchform from '../../components/searchform.vue';
import CustomTabel from '../../components/customTabel.vue';
import CustomAddModal from '../../components/customAddModal.vue';
import CustomEditModal from '../../components/customEditModal.vue';
import CustomView from '../../components/customView.vue';
import { useUserStore } from '../../store/userStore'
import fetchHotels from '../../utils/fetchHotels'

const { t } = useI18n()
const userStore = useUserStore()

const showAddModal = ref(false)
const showEditModal = ref(false)
const isEdit = ref(false)


const columns = [
    {
        title: t('user.name'),
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: t('user.email'),
        dataIndex: 'email',
        key: 'email'
    }, {
        title: t('user.owe_hotel'),
        dataIndex: 'hotel',
        key: 'hotel'
    }, {
        title: t('user.group'),
        dataIndex: 'group',
        key: 'group'
    }, {
        title: t('user.status'),
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: t('user.last_active'),
        dataIndex: 'last_active',
        key: 'last_active'
    }, {
        title: t('user.created_at'),
        dataIndex: 'created_at',
        key: 'created_a'
    }, {
        title: t('user.updated_at'),
        dataIndex: 'updated_at',
        key: 'updated_at'
    }, {
        title: t('user.actions'),
        dataIndex: 'actions',
        key: 'actions'
    }
]

const getModalItems = () => [
    {
        label: '姓名',
        name: 'username',
        type: 'input',
        placeholder: '姓名',
        rules: [{ required: true, message: '不能为空' }]
    },
    {
        label: '密码',
        name: 'password',
        type: 'input',
        placeholder: '',
        rules: isEdit.value ? [] : [{ required: true, message: '不能为空' }]
    },
    {
        label: '邮箱',
        name: 'email',
        type: 'input',
        placeholder: '邮箱',
        rules: [{ required: true, message: '不能为空' }]
    }, {
        label: '所属酒店',
        name: 'hotel',
        type: 'select',
        placeholder: '',
        options: hotelsOptions,
        rules: [{ required: true, message: '不能为空' }]
    }, {
        label: '用户组',
        name: 'group',
        type: 'select',
        placeholder: '',
        options: groupsOptions,
        rules: [{ required: true, message: '不能为空' }]
    },
    {
        label: '状态',
        name: 'status',
        type: 'select',
        placeholder: '',
        options: statusOptions,
        rules: [{ required: true, message: '不能为空' }]
    }
]

const userList = ref([])
const hotelsOptions = ref([
])
const groupsOptions = userStore.groupOptions
const statusOptions = userStore.statusOptions

const handleAdd = (d) => {
    console.log('Add User Data:', d);
    const data = {
        username: d.username,
        email: d.email,
        password: d.password,
        hotel_id: d.hotel,
        group: d.group,
        status: d.status
    }

    try {
        isEdit.value = false;
        userListApi.addUser(data);
        fetchUserList();
        message.success(t('user.add_success'));
        showAddModal.value = false;
        
    } catch (error) {
        message.error(t('user.add_error'));
    }
}

const currentUser = ref({})
const openEdit = (record) => {
    console.log('Edit User:', record);
    showEditModal.value = true;
    isEdit.value = true;
    const d = record;
    currentUser.value = {
        id: d.id,
        username: d.name,
        email: d.email,
        hotel: hotelsOptions.value.find(item => item.label === d.hotel)?.value || '',
        group: groupsOptions.find(item => item.label === d.group)?.value || '',
        status: statusOptions.find(item => item.label === d.status)?.value || '',
    }
}
const handleEdit = async (d) => {
    console.log('Current User Data:', d.group);
    const data = {
        user_id_1: d.id,
        username: d.username,
        email: d.email,
        password: d.password,
        hotel_id_1: d.hotel,
        group: d.group,
        status: d.status,
    }
    console.log('Prepared Data for API:', data);
    try {
        await userListApi.editUser(data);
        message.success(t('user.edit_success'));
        showEditModal.value = false;
        await fetchUserList();
    } catch (error) {
        message.error(t('user.edit_error'));
    }
}

const viewUser = ref([])
const isView = ref(false)
const handleView = (record) => {
    const d = record;
    viewUser.value = [
        { label: 'name', value: d.name },
        { label: 'email', value: d.email },
        { label: 'hotel', value: d.hotel },
        { label: 'group', value: d.group },
        { label: 'status', value: d.status },
        { label: 'last_active', value: d.last_active || '/' },
        { label: 'created_at', value: d.created_at || '/' },
        { label: 'updated_at', value: d.updated_at || '/' },
    ]
    isView.value = true;
}

const showBin = ref(false)
const handleBin = () => {
    showBin.value = !showBin.value;
    fetchUserList();
}

const handleDelete = async (record) => {
    console.log('Delete User:', record);
    try {
        const res = await userListApi.deleteUser({ 'user_id_1': record.id });
        message.success(t('user.delete_success'))
        fetchUserList()
    } catch (error) {
        message.error(t('user.delete_error'))
    }
}

const handleRestore = async (record) => {
    try {
        await userListApi.restoreUser({"user_id_1": record.id });
        message.success(t('user.restore_success'))
        fetchUserList()
    } catch (error) {
        message.error(t('user.restore_error'))
    }
}

const permanentDelete = async (record) => {
    try {
        await userListApi.permanentDelete({ 'user_id_1': record.id });
        message.success(t('user.permanent_delete_success'))
        fetchUserList()
    } catch (error) {
        message.error(t('user.permanent_delete_error'))
    }
}

const fetchUserList = async () => {
    try {
        let res;
        if (showBin.value) {
            res = await userListApi.getTrashUserList()
        }
        else {
            res = await userListApi.getUserList()
        }
        const data = res?.data?.users?.users || [];
        userList.value = data.map(user => ({
            id: user.user_id,
            name: user.username,
            email: user.email,
            hotel: hotelsOptions.value.find(h => h.value === user.hotel_id)?.label || '/',
            group: groupsOptions.find(item => item.value === user.group)?.label || '/',
            status: user.status === 1 ? '活跃' : '禁用',
            last_active: user.last_login_time ? formatTime(user?.last_login_time) : '/',
            created_at: user.register_time ? formatTime(user.register_time) : '/',
            updated_at: user.update_time ? formatTime(user.update_time) : '/',
        }))
    } catch (error) {
        message.error('获取用户列表失败')
    }
}

const search = [
    {
        label: t('user.name'),
        type: 'input',
    },
    {
        label: t('user.email'),
        type: 'input',
    },
    {
        label: t('user.owe_hotel'),
        type: 'select',
        options: hotelsOptions,
    },
    {
        label: t('user.group'),
        type: 'select',
        options: groupsOptions,
    },
    {
        label: t('user.status'),
        type: 'select',
        options: statusOptions,
    }
]

onMounted(async () => {
    const data = await fetchHotels();
    hotelsOptions.value = data.map(item => ({
        label: item.name,
        value: item.hotel_id_1,
    }))
    getModalItems()
    await fetchUserList()
})
</script>

<template>
    <a-card title="列表">
        <template #extra>
            <a-space v-if="!showBin">
                <a-button type="link" disabled style="padding:0">导出Excel</a-button>
                <a-button type="link" style="padding: 0;" @click="showAddModal = true">
                    {{ $t('user.add') }}
                </a-button>
                <a-button type="link" style="padding :0" @click="handleBin">
                    {{ $t('user.trash') }}
                </a-button>
            </a-space>
            <a-space v-else>
                <a-button type="link" style="padding: 0;" @click="handleBin">
                    {{ $t('user.back') }}
                </a-button>
            </a-space>
        </template>

        <Searchform :fields="search" />
        <CustomTabel :columns="columns" :dataSource="userList" :showBin="showBin" @view="handleView" @edit="openEdit"
            @delete="handleDelete" @restore="handleRestore" @permanent_delete="permanentDelete" />
        <CustomAddModal :visible="showAddModal" :items="getModalItems()" @cancel="showAddModal = false"
            @save="handleAdd" />
        <CustomEditModal :visible="showEditModal" :items="getModalItems()" :initialValues="currentUser"
            @cancel="showEditModal = false" @save="handleEdit" />
        <CustomView :visible="isView" :infos="viewUser" @close="isView = false" />
    </a-card>
</template>

<style></style>