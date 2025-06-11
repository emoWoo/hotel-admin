<template>
    <el-switch v-model="value1" :active-action-icon="Moon" :inactive-action-icon="Sunny"
        style="--el-switch-on-color: #242628;"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'

const value1 = ref(true)

const onFocus = () => {
    console.log('el-switch focused')
}
</script>