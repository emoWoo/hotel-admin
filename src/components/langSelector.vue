<script setup>
import { ref } from 'vue';

const options = [
    {
        value: 'zh-cn',
        name: '简'
    },
    {
        value: 'en',
        name: 'en'
    },
    {
        value: 'zh-tw',
        name: '繁'
    },
]
const selected = ref(options[0].name)

const focus = () => {
    console.log('选择框已聚焦')
}

// 选项改变时的回调
const handleChange = (value) => {
    console.log('切换语言为：', value)
}

</script>

<template>
    <a-select v-model:value="selected" style="width: 60px" @focus="focus" @change="handleChange">
        <a-select-option v-for="item in options" :key="item.value" :value="item.value">
            {{ item.name }}
        </a-select-option>
    </a-select>
</template>