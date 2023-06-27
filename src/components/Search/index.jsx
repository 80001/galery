import { useState } from 'react'
import './styles.scss'
import { setPage, setSearch } from '../../store/search/search.action'
import { selectSearch } from '../../store/search/search.selector'
import { useDispatch, useSelector } from 'react-redux'

const SearchImage = () => {
    const [disabled, setDisabled] = useState(true)
    const [value, setValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const search = useSelector(selectSearch)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setPage(1))
        dispatch(setSearch(searchValue))
        setSearchValue('')
    }
    const handleChange = (e) => {
        setSearchValue(e.target.value)
        if (e.target.value.trim() === '') {
            setValue("")
            setDisabled(true)
        } else {
            setDisabled(false)
            setValue('-value')
        }
    }

    return (
        <div className="search">
            <form onSubmit={handleSubmit} className="search__form">
                <input className={`search__input${value}`} onChange={handleChange} value={searchValue} placeholder='Search...' />
                <button className='search__button' disabled={disabled}>Ϙ</button>
            </form>
        </div>
    )
}

export default SearchImage
