<script setup>
import { ref,watch } from 'vue';
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const selected = ref(locale.value)

const options = [
    {
        value: 'zh',
        name: '简'
    },
    {
        value: 'en',
        name: 'en'
    },
]

// 选项改变时的回调
const handleChange = (value) => {
    locale.value = value
  localStorage.setItem('lang', value)
}

</script>

<template>
    <a-select v-model:value="selected" style="width: 60px"  @change="handleChange">
        <a-select-option v-for="item in options" :key="item.value" :value="item.value">
            {{ item.name }}
        </a-select-option>
    </a-select>
</template>