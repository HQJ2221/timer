/**
 * Copyright (c) 2023 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ElCard } from "element-plus"
import { defineComponent, useSlots } from "vue"

const _default = defineComponent(() => {
    return () => (
        <ElCard
            style={{ minHeight: '640px' }}
            bodyStyle={{ height: '100%' }}
            v-slots={useSlots()}
        />
    )
})

export default _default