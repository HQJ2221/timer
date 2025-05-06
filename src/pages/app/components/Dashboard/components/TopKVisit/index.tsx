/**
 * Copyright (c) 2022 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { t } from "@app/locale"
import statService, { type StatQueryParam } from "@service/stat-service"
import { MILL_PER_DAY } from "@util/time"
import { defineComponent } from "vue"
import ChartTitle from "../../ChartTitle"
import Wrapper, { type BizOption, DAY_NUM, TOP_NUM } from "./Wrapper"
import { initProvider } from "./context"
import Filter from "./Filter";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import HalfBarChart from "./HalfBarChart";

const fetchData = async () => {
    const now = new Date()
    const startTime: Date = new Date(now.getTime() - MILL_PER_DAY * DAY_NUM)
    const query: StatQueryParam = {
        date: [startTime, now],
        sort: "time",
        sortOrder: 'DESC',
        mergeDate: true,
    }
    const top = (await statService.selectByPage(query, { num: 1, size: TOP_NUM })).list
    const data: BizOption[] = top.map(({ time, siteKey, alias }) => ({
        name: alias ?? siteKey?.host ?? '',
        host: siteKey?.host ?? '',
        alias,
        value: time,
    }))
    for (let realSize = top.length; realSize < TOP_NUM; realSize++) {
        data.push({ name: '', host: '', value: 0 })
    }
    return data
}

const _default = defineComponent(() => {
    const filter = initProvider()
    return () => {
        const title = t(msg => msg.dashboard.topK.title, { k: filter.topK, day: DAY_NUM })
        return (
            <div class="top-visit-container">
                <ChartTitle text={title} />
                <Filter />
                <div class="chart-container">
                    {filter.chartType === 'pie' && <PieChart />}
                    {filter.chartType === 'bar' && <BarChart />}
                    {filter.chartType === 'halfPie' && <HalfBarChart />}
                </div>
            </div>
        )
    }
})

export default _default