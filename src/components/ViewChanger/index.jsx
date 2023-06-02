import { useEffect } from 'react'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectView } from '../../store/search/search.selector'
import { setClassChange, setOrientation, setView } from '../../store/search/search.action'

const ViewChanger = () => {
    const dispatch = useDispatch()
    const view = useSelector(selectView)


    useEffect(() => {
        if (view === 'small') {
            dispatch(setClassChange('-small'))
            //document.querySelector('.gallery__container').classList.add('gallery__container-small')
        } else {
            dispatch(setClassChange(''))
            //document.querySelector('.gallery__container').classList.remove('gallery__container-small')

        }
    }, [view])
    return (
        <div className="filter">
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
            </div>
            <div className='view'>
                <h5 className="view__subtitle">View</h5>
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