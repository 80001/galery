import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, setSearch, setSearchBoolean } from '../../store/search/search.action'
import { selectPage } from '../../store/search/search.selector'

const GoToSearch = (search, page) => {
    console.log('1')
    const dispatch = useDispatch()
    // const select = useSelector
    useEffect(() => {
        dispatch(setSearch(search))
        dispatch(setPage(page))
    }, [])
    /*     let location = window.location.href
        let search = 'x'
        let page = 'x'
        if (location.match('/s/')) {
            search = location.split('/')[4]
            page = location.split('/')[5]
            console.log(select(selectPage))
        } */
}

export default GoToSearch