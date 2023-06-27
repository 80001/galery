import './styles.scss'
import { useDispatch, useSelector } from "react-redux"
import { selectMorePage, selectPage } from "../../store/search/search.selector"
import { setMorePage, setPage } from "../../store/search/search.action"
import Button from '../Button'
import { useParams } from 'react-router-dom'
import { selectBlogMorePage, selectBlogPage } from '../../store/blog/blog.selector'
import { useEffect, useState } from 'react'
import { setBlogMorePage, setBlogPage } from '../../store/blog/blog.action'

const Pages = ({ lastPage }) => {
	const params = useParams()
	const dispatch = useDispatch()
	const [page, setPages] = useState(1)
	const [morePage, setMorePages] = useState(1)
	const blogP = useSelector(selectBlogPage)
	const moreP = useSelector(selectBlogMorePage)
	const galleryP = useSelector(selectPage)
	const moreGallery = useSelector(selectMorePage)
	useEffect(() => {
		if (params.blog) {
			setPages(blogP)
			setMorePages(moreP)
		} else {
			setPages(galleryP)
			setMorePages(moreGallery)
		}
	}, [blogP, moreP, galleryP, moreGallery, params.blog])
	//const page = useSelector(selectPage)
	//const morePage = useSelector(selectMorePage)
	const setPageS = (num) => {
		if (params.blog) {
			dispatch(setBlogPage(num))
			dispatch(setBlogMorePage(1))
		} else {
			dispatch(setPage(num))
			dispatch(setMorePage(1))
		}
	}

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
		//window.history.pushState(null, '', `${window.location.pathname}`)
		if (page === lastPage) {
			return
		} else if ((page + morePage) > lastPage) {
			setPageS(lastPage)
			return
		} else {
			setPageS(Number(page + morePage))
		}
	}
	const pageSetMinus = () => {
		//window.history.pushState(null, '', `${window.location.pathname}`)
		if (page === 1) {
			return page
		}
		setPageS(Number(page) - 1)
	}
	const pageEnter = (e) => {
		//window.history.pushState(null, '', `${window.location.pathname}`)
		setPageS(Number(e.target.value))
	}
	const setLastPage = () => {
		setPageS(lastPage)
	}
	return (
		<div className="pages">
			<Button className="page"
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
				className="page page-input" />
			<Button className="page"
				buttonType="white"
				disabled={pageDisabledMax()}
				onClick={pageSetPlus}>Next</Button>
			<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>...</span>
			<Button className="page"
				buttonType="white"
				onClick={setLastPage}>{lastPage}</Button>
		</div>
	)
}
export default Pages