import Loading from "common/Loading"
import NoData from "common/NoData"
import Pagination from "common/Pagination"
import Title from "common/Title"
import ProfileHandle from "handles/profile.handle"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTER_PATH } from "routes/contants"
import { Content } from "styled/common"
import { HeaderList } from "styled/list"
import { ContentWrapper, FlexLayoutSwap } from "styled/main"
import { AddButton, ProfileBox } from "styled/profile"
import { ProfileHandleRes, ProfileType } from "utils/interface"
import ProfileItem from "./Item/Profile"

const Profile = () => {
    const navigate = useNavigate()
    const { getLists, setPaging, paging, data, isLoading }: ProfileHandleRes = ProfileHandle()

    useEffect(() => {
        getLists()
    }, [])

    return (
        <ContentWrapper>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <HeaderList>
                        <Title text='Profile' />
                        <AddButton onClick={() => navigate(`${ROUTER_PATH.CREATE_PROFILE}`)}>+</AddButton>
                    </HeaderList>

                    <FlexLayoutSwap>
                        {data?.length > 0 ? data.map((item: ProfileType) => (
                            <ProfileBox key={item.id} onClick={() => navigate(`${ROUTER_PATH.PROFILE}/${item.id}`)}>
                                <ProfileItem data={item} />
                            </ProfileBox>
                        )) : (
                            <NoData />
                        )}
                    </FlexLayoutSwap>
                    <Pagination
                        currentPage={paging.currentPage}
                        totalCount={paging.totalPage}
                        pageSize={paging.pageSize}
                        onPageChange={(page: number) => {
                            setPaging({ ...paging, currentPage: page })
                        }}
                    />
                </Content>
            )}
        </ContentWrapper>
    )
}

export default Profile