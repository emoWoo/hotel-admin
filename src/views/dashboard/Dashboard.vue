<script setup>
import ApexChart from 'vue3-apexcharts'
import { ref, computed, onMounted } from 'vue'
import luggageApi from '../../api/luggage'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const statistics = ref({
    month_check_in: 0,
    month_check_out: 0,
    check_list: [],
})
const todayCheckInCount = computed(() => statistics.value?.check_list?.[0]?.check_in || 0)
const todayCheckOutCount = computed(() => statistics.value?.check_list?.[0]?.check_out || 0)
const monthlyCheckInCount = computed(() => statistics.value?.month_check_in)
const monthlyCheckOutCount = computed(() => statistics.value?.month_check_out)

const distributionChartOptions = ref({
    chart: {
        foreColor: '#333',
        stackOnlyBar: true,
        type: 'pie',
        zoom: {
            allowMouseWheelZoom: true,
        },
    },
    fill: {
        opacity: 1,
    },
    labels: [
        t('dashboard.luggage_checkin_count'),
        t('dashboard.luggage_checkout_count'),
    ],
    legend: {
        horizontalAlign: 'center',
        position: 'bottom',
        fontSize: '16px',
    },
    stroke: {
        fill: {
            type: 'solid',
            opacity: 0.85,
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [
                    0,
                    50,
                    100,
                ],
                colorStops: [],
            },
        },
    },
})
const distributionSeries = computed(() => [
    statistics.value?.month_check_in,
    statistics.value?.month_check_out,
])

function getTodayAndLastTenDays() {
    const dates = []
    const today = new Date()
    dates.push(today.toISOString().split('T')[0])
    for (let i = 1; i <= 10; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        dates.push(date.toISOString().split('T')[0])
    }
    return dates.reverse()
}

const monthlyChartOptions = ref({
    chart: {
        height: '500px',
        type: 'area',
    },
    stroke: {
        curve: 'smooth',
    },
    dataLabels: {
        enabled: false,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
        },
    },
    xaxis: {
        categories: getTodayAndLastTenDays(),
    },
})

const monthlySeries = computed(() => [
    {
        name: t('dashboard.luggage_checkin_count'),
        data: statistics.value?.check_list.map(item => item.check_in).reverse(),
    },
    {
        name: t('dashboard.luggage_checkout_count'),
        data: statistics.value?.check_list.map(item => item.check_out).reverse(),
    },
])

onMounted(async () => {
    try {
        const res = await luggageApi.getStatics()
        statistics.value = res.data
    } catch (err) {
        console.error('Error fetching statistics:', err)
    }
})
</script>

<template>
    <a-row :gutter="[16, 16]">
        <a-col :flex="5">
            <a-card :title="$t('dashboard.today_data')">
                <div class="stats-container">
                    <AStatistic :value="todayCheckInCount" suffix="件" :value-style="{
                        color: '#333',
                        fontSize: '36px',
                        textAlign: 'center',
                    }">
                        <template #title>
                            <span class="stat-title">
                                {{ $t('dashboard.today_checkin_count') }}
                            </span>
                        </template>
                    </AStatistic>
                    <AStatistic :value="todayCheckOutCount" suffix="件" :value-style="{
                        color: '#333',
                        fontSize: '36px',
                        textAlign: 'center',
                    }">
                        <template #title>
                            <span class="stat-title">
                                {{ $t('dashboard.today_checkout_count') }}
                            </span>
                        </template>
                    </AStatistic>
                    <div class="divider" />
                    <AStatistic :value="monthlyCheckInCount" suffix="件" :value-style="{
                        color: '#333',
                        fontSize: '36px',
                        textAlign: 'center',
                    }">
                        <template #title>
                            <span class="stat-title">
                                {{ $t('dashboard.this_month_checkin_count') }}
                            </span>
                        </template>
                    </AStatistic>
                    <AStatistic :value="monthlyCheckOutCount" suffix="件" :value-style="{
                        color: '#333',
                        fontSize: '36px',
                        textAlign: 'center',
                    }">
                        <template #title>
                            <span class="stat-title">
                                {{ $t('dashboard.this_month_checkout_count') }}
                            </span>
                        </template>
                    </AStatistic>
                </div>
            </a-card>
        </a-col>
        <a-col :flex="3">
            <a-card :title="$t('dashboard.this_month_checkout_ditribution')">
                <ApexChart height="200" :options="distributionChartOptions" :series="distributionSeries" />
            </a-card>
        </a-col>
    </a-row>
    <a-row style="margin-top: 16px;">
        <a-col :span="24">
            <a-card :title="$t('dashboard.luggage_checkin_count')">
                <ApexChart height="400" :options="monthlyChartOptions" :series="monthlySeries" />
            </a-card>
        </a-col>
    </a-row>
</template>

<style scoped>
.stats-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 0 80px;
    /* 20 * 4 = 80px for px-20 */
}

.stat-title {
    color: #000;
    font-size: 14px;
}

.divider {
    height: 200px;
    width: 1px;
    background-color: #e5e7eb;
    /* Tailwind's gray-200 */
}
</style>