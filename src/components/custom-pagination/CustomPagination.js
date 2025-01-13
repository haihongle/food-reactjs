import style from './CustomPagination.module.scss';
import ReactPaginate from 'react-paginate';

function CustomPagination({ pageCount, handlePageClick }) {
	return (
		<ReactPaginate
			previousLabel={'<<'}
			nextLabel={'>>'}
			breakLabel={'...'}
			pageCount={pageCount}
			marginPagesDisplayed={1}
			pageRangeDisplayed={1}
			onPageChange={handlePageClick}
			containerClassName={style.pagination}
			activeClassName={style.active}
			breakClassName={style.breakMe}
		/>
	);
}

export default CustomPagination;
