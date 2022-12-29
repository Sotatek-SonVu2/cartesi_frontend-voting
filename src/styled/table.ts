import styled from 'styled-components'

export const Ttable = styled.table`
	border-collapse: collapse;
	width: 100%;
	text-align: left;
`

export const Theader = styled.tr`
	& th {
		border-bottom: 1px solid #6c6b6b;
		padding: 0 5px 10px;
	}
`

export const Tcolumn = styled.tr`
	& td {
		border-bottom: 1px solid #6c6b6b;
		padding: 10px 0;
	}
`
