<script setup>
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue'
import UserModal from '../../components/user/Usermodal.vue'
import Userdescription from '../../components/user/Userdescription.vue';
import userListApi from '../../api/userList'
import hotelApi from '../../api/hotel'
import groupApi from '../../api/group';
import formatTime from '../../utils/formatTime'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const modalVisible = ref(false)
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

const userList = ref([])
const hotelsOptions = ref([
])
const groupsOptions = ref([
])
const statusOptions = [{
    label: t('user.active'),
    value: 1
},
    // {
    //     label: t('user.banned'),
    //     value: 0
    // }
]

const newUser = reactive({
    name: '',
    password: '',
    email: '',
    hotel: '',
    group: '',
    status: ''
})

const handleAdd = () => {
    isEdit.value = false;
    modalVisible.value = true;
    newUser.name = '';
    newUser.email = '';
    newUser.hotel = '';
    newUser.group = '';
    newUser.status = '';
}

const currentUser = ref({})
const handleEdit = async (record) => {
    // console.log('Editing User:', record)
    isEdit.value = true
    // currentUser.value = { ...record }
    modalVisible.value = true
    try {
        const res = await userListApi.getUserDetail(record.id)
        // console.log('User Detail:', res.data)
        currentUser.value = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            hotel: res.data.hotel_id,
            group: res.data.user_group?.id || '',
            status: res.data.status,
        }
    } catch (error) {

    }
}

const handleSubmit = async (user) => {
    // console.log('Submitted User:', user)
    try {
        const res = await userListApi.submitUser(user?.id, user)
        // console.log('Submit Response:', res)
        await fetchUserList()
    } catch (error) {

    }
}

const viewUser = ref({})
const descvisible = ref(false)
const handleView = async (record) => {
    try {
        const res = await userListApi.getUserDetail(record.id)
        console.log('User Detail:', res.data)
        const d = res.data
        viewUser.value = {
            name: d.name,
            email: d.email,
            hotel: hotelsOptions.value.find(hotel => hotel.value === d.hotel_id)?.label || '/',
            group: d.user_group?.name || '/',
            status: d.status = 1 ? '活跃' : '禁用',
            last_active: d.last_active ? formatTime(d.last_active) : '/',
            created_at: formatTime(d.created_at),
            updated_at: formatTime(d.updated_at),
        }
        descvisible.value = true;
    } catch (error) {

    }

}

const showBin = ref(false)
const handleBin = () => {
    showBin.value = !showBin.value;
    console.log('Toggle Bin:', showBin.value);
    fetchUserList();
}

const handleDelete = async (record, isPermanent) => {
    console.log('Delete User:', record);
    try {
        const res = await userListApi.deleteUser(record.id, {
            permanent: isPermanent
        })
        console.log('Delete Response:', res.data);
        message.success(t('user.delete_success'))
        fetchUserList()
    } catch (error) {
        message.error(t('user.delete_error'))
    }
}

const handleRestore = async (record, isPermanent) => {
    try {
        await userListApi.restoreUser(record.id, {
            permanent: isPermanent
        })
        message.success(t('user.restore_success'))
        // message.success('abc')
        fetchUserList()
    } catch (error) {
        message.error(t('user.restore_error'))
    }
}
const fetchUserList = async () => {
    try {
        const res = await userListApi.getUserList(
            {
                trash: showBin.value,
                page: 1,
                page_size: 20,
            }
        )
        console.log('User List:', res.data.data)
        const data = res.data.data
        console.log('Data:', data)
        userList.value = data.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            hotel: user.hotel?.name || '/',
            group: user.user_group?.name || '/',
            status: user.status === 1 ? '活跃' : '禁用',
            last_active: user.last_active ? formatTime(user?.last_active) : '/',
            created_at: formatTime(user.created_at),
            updated_at: formatTime(user.updated_at),
        }))
        console.log('User List Mapped:', userList.value)
    } catch (error) {
        message.error('获取用户列表失败')
    }
}
const fetchHotels = async () => {
    try {
        const res = await hotelApi.getHotels()
        hotelsOptions.value = res.data.data.map(hotel => ({
            label: hotel.name,
            value: hotel.id
        }))
    } catch (error) {
        message.error('获取酒店列表失败')
    }
}
const fetchGroups = async () => {
    try {
        const res = await groupApi.getGroups()
        // console.log('Groups:', res.data.data[0])
        groupsOptions.value = res.data.data.map(group => ({
            label: group.name,
            value: group.id
        }))
        // console.log('Groups Options:', groupsOptions.value)
    } catch (error) {
        message.error('获取用户组列表失败')
    }
}

onMounted(async () => {
    await fetchUserList()
    await fetchHotels()
    await fetchGroups()
})
</script>

<template>
    <a-card title="列表">
        <template #extra>
            <a-space v-if="!showBin">
                <a-button type="link" disabled style="padding:0">导出Excel</a-button>
                <a-button type="link" style="padding: 0;" @click="handleAdd">
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

        <a-form>
            <a-row :gutter="[16, 16]"> <!-- 横向和纵向间距 -->
                <a-col :xs="24" :sm="12" :md="8" :lg="6">
                    <a-form-item :label="$t('user.name')">
                        <a-input :placeholder="$t('user.name')" />
                    </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="12" :md="8" :lg="6">
                    <a-form-item :label="$t('user.email')">
                        <a-input :placeholder="$t('user.email')" />
                    </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="12" :md="8" :lg="6">
                    <a-form-item :label="$t('user.owe_hotel')">
                        <a-select :options="hotelsOptions" />
                    </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="12" :md="8" :lg="6">
                    <a-form-item :label="$t('user.group')">
                        <a-select :options="groupsOptions" />
                    </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="12" :md="8" :lg="6">
                    <a-form-item :label="$t('user.status')">
                        <a-select :options="statusOptions" />
                    </a-form-item>
                </a-col>
                <a-button>{{ $t('user.reset') }}</a-button>
            </a-row>

        </a-form>

        <a-row>
            <a-col :span="24">
                <a-table :columns="columns" :data-source="userList" :scroll="{ x: 'max-content' }">
                    <template #bodyCell="{ column, record }">
                        <span v-if="column.key === 'actions'">
                            <a-space v-if="!showBin">
                                <a-button type="link" style="padding: 0;" @click="handleView(record)">{{ $t('user.view')
                                    }}</a-button>
                                <a-button type="link" style="padding: 0;" @click="handleEdit(record)">{{ $t('user.edit')
                                    }}</a-button>
                                <a-popconfirm :title="$t('user.sure_delete')" :ok-text="$t('user.yes')"
                                    :cancel-text="$t('user.no')" @confirm="handleDelete(record, false)">
                                    <a-button danger type="link" style="padding: 0;">{{ $t('user.delete') }}</a-button>
                                </a-popconfirm>

                            </a-space>
                            <a-space v-else>
                                <a-popconfirm :title="$t('user.sure_restore')" :ok-text="$t('user.yes')"
                                    :cancel-text="$t('user.no')" @confirm="handleRestore(record, false)">
                                    <a-button type="link" style="padding: 0;">{{ $t('user.restore') }}</a-button>
                                </a-popconfirm>
                                <a-popconfirm :title="$t('user.sure_permanent_delete')" :ok-text="$t('user.yes')"
                                    :cancel-text="$t('user.no')" @confirm="handleDelete(record, true)">
                                    <a-button danger type="link" style="padding: 0;">{{ $t('user.permanent_delete')
                                        }}</a-button>
                                </a-popconfirm>
                            </a-space>
                        </span>
                    </template>
                </a-table>
            </a-col>
        </a-row>

        <UserModal :visible="modalVisible" :userData="isEdit ? currentUser : newUser" :isEdit="isEdit"
            :hotelOptions="hotelsOptions" :groupOptions="groupsOptions" :statusOptions="statusOptions"
            @save="handleSubmit" @close="modalVisible = false" />
        <Userdescription :visible="descvisible" @close="descvisible = false" :userinfo="viewUser" />
    </a-card>
</template>

<style></style>