import React from 'react'
import { usePagination, DOTS } from 'hook/usePagination'
import { ArrowLeft, ArrowRight, PaginationItem, PaginationWrapper } from 'styled/common'

interface PropsType {
	onPageChange: Function
	totalCount: number
	siblingCount?: number
	currentPage: number
	pageSize: number
}

const Pagination = ({
	onPageChange,
	totalCount,
	siblingCount = 1,
	currentPage,
	pageSize,
}: PropsType) => {
	const paginationRange: any = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	})

	if (currentPage === 0 || paginationRange?.length < 2) {
		return null
	}

	const onNext = () => {
		onPageChange(currentPage + 1)
	}

	const onPrevious = () => {
		onPageChange(currentPage - 1)
	}

	let lastPage = paginationRange?.length > 0 ? paginationRange[paginationRange.length - 1] : 0

	return (
		<PaginationWrapper>
			<PaginationItem disabled={currentPage === 1} onClick={onPrevious}>
				<ArrowLeft className='arrow' />
			</PaginationItem>
			{paginationRange?.length > 0 &&
				paginationRange.map((pageNumber: string | number, index: number) => {
					if (pageNumber === DOTS) {
						return (
							<li key={index} className='dots'>
								&#8230;
							</li>
						)
					}
					return (
						<PaginationItem
							key={index}
							selected={pageNumber === currentPage}
							onClick={() => onPageChange(pageNumber)}>
							{pageNumber}
						</PaginationItem>
					)
				})}
			<PaginationItem disabled={currentPage === lastPage} onClick={onNext}>
				<ArrowRight className='arrow' />
			</PaginationItem>
		</PaginationWrapper>
	)
}

export default Pagination
