import { useState } from "react"
import styled from "styled-components";
import Loading from "../common/Loading";
import NoData from "../common/NoData";
import { Content, Title } from "../styled/common";
import { BoxItem } from "../styled/list";
import { FlexLayout } from "../styled/main";
import WithdrawItem from "./Item/Withdraw";

const FlexLayoutSwap = styled(FlexLayout)`
    flex-wrap: wrap;
`

const Withdraw = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [items, setItems] = useState<any[]>(['1', '2', '3', '4', '5'])

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <Title>
                        Withdraw
                    </Title>
                    <FlexLayoutSwap>
                        {items?.length > 0 ? items?.map((item: any) => (
                            <BoxItem key={item.id}>
                                <WithdrawItem data={item} />
                            </BoxItem>
                        )) : (
                            <NoData />
                        )}
                    </FlexLayoutSwap>

                </Content>
            )}
        </>
    )
}

export default Withdraw