import React, { useEffect, useState } from 'react'
import { ShowMoreImage, UnsplashAPI } from '../../api/Unsplash'
import PhotoComp from './PhotoComp'
import './styles.scss'
import Loader from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { selectMorePage, selectPage, selectSearch } from '../../store/search/search.selector'
import Pages from '../../components/Pagination'
import { useParams, useNavigate } from 'react-router-dom'
import { setMorePage, setPage, setSearch } from '../../store/search/search.action'
import Button from '../../components/Button'
import ButtonToTop from '../../components/Button/ButtonToTop'

const Gallery = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const search = useSelector(selectSearch)
    const page = useSelector(selectPage)
    const morePage = useSelector(selectMorePage)
    const navigate = useNavigate()
    const dataAPI = UnsplashAPI()
    const moreDataAPI = ShowMoreImage()
    const [map, setMap] = useState(dataAPI.results)

    // Check if URL changes
    useEffect(() => {
        if (params.search && params.page) {
            const searchValue = params.search.replaceAll('-', ' ')
            const pageValue = parseInt(params.page, 10)
            dispatch(setSearch(searchValue))
            dispatch(setPage(pageValue))
        }
    }, [params.search, params.page])

    // Replace (%20 to -) for URL
    useEffect(() => {
        setMap(dataAPI.results)
        navigate(`/s/${search.replaceAll(' ', '-')}/${page}`, { replace: true })
        dispatch(setMorePage(1))
        console.log(page, morePage)
    }, [search, page, dataAPI.results])

    const showMore = () => {
        setMap([...map, ...moreDataAPI])
        dispatch(setMorePage(morePage + 1))
    }

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
                            {map.map(photo => (
                                <PhotoComp key={photo.id} photo={photo} />
                            ))}
                        </>
                    )}
                </ul>
                <Button
                    className='gallery__btn gallery__btn-show'
                    buttonType='dark'
                    onClick={showMore}
                >
                    SHOW MORE
                </Button>
                <Pages lastPage={dataAPI.total_pages} />
                <ButtonToTop />
            </div>
        )
    }
}

export default Gallery
