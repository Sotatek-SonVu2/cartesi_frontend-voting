import Loading from 'common/Loading'
import NoData from 'common/NoData'
import ReactSelect from 'common/ReactSelect'
import Title from 'common/Title'
import HistoryHandle from 'handles/history.handle'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { Content } from 'styled/common'
import { TimeLine } from 'styled/list'
import { Container, ContentWrapper, FlexLayout } from 'styled/main'
import { historyOptions } from 'utils/contants'
import { HistoryHandleRes } from 'utils/interface'
import HistoryItem from './Item/History'

const FlexLayoutBetween = styled(FlexLayout)`
	justify-content: space-between;
	margin-bottom: 20px;
	color: #000;
`

const History = () => {
	const { isLoading, paging, items, type, onChangeSelect, getData }: HistoryHandleRes =
		HistoryHandle()
	const { totalPage } = paging

	useEffect(() => {
		getData()
	}, [type])

	return (
		<Container>
			<ContentWrapper>
				<Content>
					<FlexLayoutBetween>
						<Title text='History' userGuideType='history' />
						<ReactSelect
							defaultValue={historyOptions[0]}
							options={historyOptions}
							onChange={onChangeSelect}
						/>
					</FlexLayoutBetween>
					<InfiniteScroll
						dataLength={items.length}
						next={getData}
						hasMore={items.length === totalPage ? false : true}
						loader={<></>}>
						<TimeLine>
							<ul>
								{!isLoading && items.length === 0 ? (
									<NoData />
								) : (
									items.map((item: any, index: number) => (
										<div key={index}>
											<HistoryItem data={item} index={index} />
										</div>
									))
								)}
							</ul>
						</TimeLine>
					</InfiniteScroll>
					{isLoading && <Loading />}
				</Content>
			</ContentWrapper>
		</Container>
	)
}

export default History
