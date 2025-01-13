import CustomPagination from '../custom-pagination/CustomPagination';

function CardHeader({ pageCount, paginateFunction, modalID, buttonName }) {
	return (
		<div
			className={`card-header d-flex ${buttonName ? ' justify-content-between' : ' justify-content-end'}`}
		>
			{buttonName && (
				<div>
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target={modalID}
					>
						{buttonName}
					</button>
				</div>
			)}
			{pageCount > 0 && (
				<CustomPagination pageCount={pageCount} handlePageClick={paginateFunction} />
			)}
		</div>
	);
}

export default CardHeader;
