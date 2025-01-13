import { useState } from 'react';

function CreateNew() {
	const [name, setName] = useState('');
	const [timeEstimate, setTimeEstimate] = useState('');
	const [totalPrice, setTotalPrice] = useState('');
	const [arr, setArr] = useState([
		{
			ingredient: '',
			quantity: null,
			unit: '',
			cost: '',
		},
	]);

	function addRow() {
		setArr([
			...arr,
			{
				ingredient: '',
				quantity: null,
				unit: '',
				cost: '',
			},
		]);
	}

	function handleInputChange(index, field, value) {
		const newArr = [...arr];
		newArr[index][field] = value;
		setArr(newArr);
	}

	function submit(event) {
		event.preventDefault();
		const formData = {
			name,
			timeEstimate,
			totalPrice,
			ingredients: arr,
		};
		console.log(formData);
	}

	return (
		<div>
			<h1>Create new food</h1>
			<form onSubmit={submit}>
				<div className="row">
					<div className="col">
						<label>Name</label>
						<input
							type="text"
							className="form-control"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="col">
						<label>Time estimate</label>
						<input
							type="text"
							className="form-control"
							value={timeEstimate}
							onChange={(e) => setTimeEstimate(e.target.value)}
						/>
					</div>
					<div className="col">
						<label>Total price</label>
						<input
							type="text"
							className="form-control"
							value={totalPrice}
							onChange={(e) => setTotalPrice(e.target.value)}
						/>
					</div>
				</div>
				<table className="table mt-4">
					<thead>
						<tr>
							<th className="text-center">Ingredient</th>
							<th className="text-center">Quantity</th>
							<th className="text-center">Unit</th>
							<th className="text-center">Cost</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{arr.map((item, key) => (
							<tr key={key}>
								<td>
									<select
										className="form-select"
										value={item.ingredient}
										onChange={(e) => handleInputChange(key, 'ingredient', e.target.value)}
									>
										<option value="">Select ingredient</option>
									</select>
								</td>
								<td>
									<input
										type="number"
										className="form-control"
										value={item.quantity || ''}
										onChange={(e) => handleInputChange(key, 'quantity', e.target.value)}
									/>
								</td>
								<td>
									<input
										type="text"
										className="form-control"
										value={item.unit}
										onChange={(e) => handleInputChange(key, 'unit', e.target.value)}
									/>
								</td>
								<td>
									<input
										type="text"
										className="form-control"
										value={item.cost}
										onChange={(e) => handleInputChange(key, 'cost', e.target.value)}
									/>
								</td>
								<td className="text-center">
									<button className="btn btn-danger">
										<i className="fa-solid fa-minus"></i>
									</button>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={5}>
								<button type="button" className="w-100 btn btn-warning" onClick={addRow}>
									Add row<i className="fa-solid fa-plus ms-1"></i>
								</button>
							</td>
						</tr>
					</tfoot>
				</table>
				<button className="btn btn-success" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default CreateNew;
