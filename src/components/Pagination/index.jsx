
import Button from "../Buttons"
import './styles.scss'
import { useDispatch, useSelector } from "react-redux"
import { selectPage } from "../../store/search/search.selector"
import { setPage } from "../../store/search/search.action"

const Pages = ({ lastPage }) => {
	const dispatch = useDispatch()
	const page = useSelector(selectPage)
	const setPages = (num) => dispatch(setPage(num))

	const pageDisabledMin = () => {
		if (page === 1) {
			return true
		}
		return false
	}
	const pageDisabledMax = () => {
		if (page === lastPage) {
			return true
		}
		return false
	}
	const pageSetPlus = () => {
		if (page === lastPage) {
			setPages(lastPage)
		}
		setPages(Number(page) + 1)
	}
	const pageSetMinus = () => {
		if (page <= 1) {
			return page
		}
		setPages(Number(page) - 1)
	}
	const pageEnter = (e) => {
		setPages(e.target.value)
	}

	return (
		<div className="galery__pages">
			<Button className="galery__page"
				buttonType="white"
				disabled={pageDisabledMin()}
				onClick={pageSetMinus}>Prev</Button>
			<input
				type="number"
				min={1}
				max={lastPage}
				onChange={pageEnter}
				value={page}
				placeholder='69'
				className="galery__page galery__page-input" />
			<Button className="galery__page"
				buttonType="white"
				disabled={pageDisabledMax()}
				onClick={pageSetPlus}>Next</Button>
			<Button className="galery__page"
				buttonType="white">{lastPage}</Button>
		</div>
	)
}
export default Pages