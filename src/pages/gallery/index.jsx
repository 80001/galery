import React, { useEffect } from 'react'
import { UnsplashAPI } from '../../api/Unsplash'
import PhotoComp from './PhotoComp'
import './styles.scss'
import Loader from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { selectPage, selectSearch } from '../../store/search/search.selector'
import Pages from '../../components/Pagination'
import { useParams, useNavigate } from 'react-router-dom'
import { setPage, setSearch } from '../../store/search/search.action'

const Gallery = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const search = useSelector(selectSearch)
    const page = useSelector(selectPage)
    const navigate = useNavigate()

    useEffect(() => {
        if (params.search && params.page) {
            const searchValue = params.search.replaceAll('-', ' ')
            const pageValue = parseInt(params.page, 10)
            dispatch(setSearch(searchValue))
            dispatch(setPage(pageValue))
        }
    }, [params.search, params.page, dispatch])
    useEffect(() => {
        navigate(`/s/${search.replaceAll(' ', '-')}/${page}`, { replace: true })
    }, [search, page])
    const dataAPI = UnsplashAPI()

    if (dataAPI.results.length === 0) {
        if (dataAPI.total === 0) {
            return (
                <div className='gallery'>
                    <h2 className="gallery__title">'{search}' not found! Ask something else, beach!!!</h2>
                </div>
            )
        }
        return <Loader />
    } else if (dataAPI.errors) {
        return (
            <div className='gallery'>
                <div>{dataAPI.errors[0]}</div>
                <h2 className="gallery__title">PS: Make sure to set your access token!</h2>
            </div>
        )
    } else {
        return (
            <div className="gallery">
                <h2 className="gallery__title">{search}</h2>
                <div className="gallery__utils">
                    {/* <ViewChanger /> */}
                    <Pages lastPage={dataAPI.total_pages} />
                </div>
                <ul className={`gallery__container`}>
                    {(
                        <>
                            {dataAPI.results.map(photo => (
                                <PhotoComp key={photo.id} photo={photo} />
                            ))}
                        </>
                    )}
                </ul>
            </div>
        )
    }
}

export default Gallery
