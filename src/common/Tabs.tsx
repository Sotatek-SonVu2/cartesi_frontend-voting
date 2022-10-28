import { useState } from "react"
import { TabContent, TabLabel, TabPane } from "styled/tabs"
import { tabItemType } from "utils/interface"

interface PropsType {
    items: tabItemType[]
    defaultActiveKey?: number
}

const Tabs = ({ items, defaultActiveKey = 1 }: PropsType) => {
    const [current, setCurrent] = useState<number>(defaultActiveKey)

    return (
        <>
            <TabPane>
                {items.map((item: any) => (
                    <TabLabel key={item.key} onClick={() => setCurrent(item.key)} active={current === item.key}>
                        {item.label}
                    </TabLabel>
                ))}
            </TabPane>
            {items.map((item: any) => (
                <TabContent key={item.key}>
                    {current === item.key && item.content}
                </TabContent>
            ))}
        </>
    )
}

export default Tabs