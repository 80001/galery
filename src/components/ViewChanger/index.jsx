import { useEffect } from 'react'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectClassChange, selectView } from '../../store/search/search.selector'
import { setClassChange, setOrientation, setView } from '../../store/search/search.action'
import { useParams } from 'react-router-dom'
import { setBlogSorted } from '../../store/blog/blog.action'

const ViewChanger = () => {
    const dispatch = useDispatch()
    const { blog } = useParams()
    const view = useSelector(selectView)
    const classChange = useSelector(selectClassChange)

    useEffect(() => {
        if (view === 'small') {
            dispatch(setClassChange('-small'))
        } else {
            if (classChange !== '') {
                dispatch(setClassChange(''))
            }
        }
    }, [view, dispatch])
    return (
        <div className="filter">
            {blog
                ? <div className="filter__sorter">
                    <h5 className="filter__subtitle">Sort:</h5>
                    <select
                        name="sorter"
                        id="sorter"
                        className="filter__sort"
                        onChange={(value) => dispatch(setBlogSorted(value.target.value))}>
                        <option value="mixed">Mixed</option>
                        <option value="new">New first</option>
                        <option value="old">Latest first</option>
                    </select>
                </div>
                :
                <div className="filter__orientation">
                    <h5 className="filter__subtitle">Orientation</h5>
                    <select
                        name="orientation"
                        id="orientation"
                        className="filter__or"
                        onChange={(value) => dispatch(setOrientation(value.target.value))}>
                        <option value="landscape">Landscape</option>
                        <option value="portrait">Portrait</option>
                        <option value="squarish">Squarish</option>
                    </select>
                </div>}
            <div className='view'>
                <h5 className="filter__subtitle">View</h5>
                <select className='view__select'
                    name="view"
                    id="view"
                    onChange={(value) => dispatch(setView(value.target.value))}>
                    <option value="big">Big Image</option>
                    <option value="small">Small Image</option>
                </select>
            </div>
        </div>
    )
}

export default ViewChanger