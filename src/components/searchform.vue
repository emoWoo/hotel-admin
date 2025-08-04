<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
    fields: {
        type: Array,
        //label,type,options?
    }
})

// const formModel = reactive({})

// watch(() => props.fields,
//     (newFileds) => {

//     }
// )


</script>

<template>
    <a-form>
        <a-row :gutter="[16, 16]"> <!-- 横向和纵向间距 -->
            <a-col v-for="(field, i) in props.fields" :key="i" :xs="24" :sm="12" :md="8" :lg="6">
                <a-form-item :label="field.label">
                    <a-input v-if="field.type === 'input'" :placeholder="field.label" />
                    <a-select v-if="field.type === 'select'" :options="field.options" />
                </a-form-item>

            </a-col>

            <a-button>重置</a-button>
        </a-row>

    </a-form>
</template>