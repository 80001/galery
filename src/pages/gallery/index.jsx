import React, { useEffect, useState } from 'react'
import { ShowMoreImage, UnsplashAPI } from '../../api/Unsplash'
import PhotoComp from './PhotoComp'
import './styles.scss'
import Loader from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { selectClassChange, selectMorePage, selectPage, selectSearch, selectorientation } from '../../store/search/search.selector'
import Pages from '../../components/Pagination'
import { useParams, useNavigate } from 'react-router-dom'
import { setMorePage, setPage, setSearch } from '../../store/search/search.action'
import Button from '../../components/Button'
import ViewChanger from '../../components/ViewChanger'
import { selectCreatePostModal, selectZoomModal } from '../../store/modals/modals.selector'
import CreatePostModal from '../../components/modal/CreatePostModal'
import ZoomModal from '../../components/modal/ZoomModal'
import { setPhotoMap } from '../../store/modals/modals.action'

const Gallery = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const search = useSelector(selectSearch)
    const orientation = useSelector(selectorientation)
    const classChange = useSelector(selectClassChange)
    const page = useSelector(selectPage)
    const morePage = useSelector(selectMorePage)
    const navigate = useNavigate()
    const dataAPI = UnsplashAPI()
    const moreDataAPI = ShowMoreImage()
    const [map, setMap] = useState(dataAPI.results)
    const isPostModalOpen = useSelector(selectCreatePostModal)
    const isZoomModalOpen = useSelector(selectZoomModal)


    useEffect(() => {
    }, [isPostModalOpen, isZoomModalOpen])
    // Check if URL changes
    useEffect(() => {
        if (params.search && params.page) {
            const searchValue = params.search.replaceAll('-', ' ')
            const pageValue = parseInt(params.page, 10)
            dispatch(setSearch(searchValue))
            dispatch(setPage(pageValue))
        }
        // eslint-disable-next-line
    }, [params.search, params.page])

    // Replace (%20 to -) for URL
    useEffect(() => {
        setMap(dataAPI.results)
        navigate(`/s/${search.replaceAll(' ', '-')}/${page}`, { replace: false })
        dispatch(setMorePage(1))
        // eslint-disable-next-line
    }, [dataAPI.results])

    useEffect(() => {
        dispatch(setPage(1))
        // eslint-disable-next-line
    }, [orientation])
    const showMore = () => {
        setMap([...map, ...moreDataAPI])
        dispatch(setMorePage(morePage + 1))
    }
    const [isLoad, setIsLoad] = useState(true)
    const handleLoadImage = () => {
        setIsLoad(false)
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
        if (map) {
            dispatch(setPhotoMap(map))
        }
        return (
            <div className="gallery" onLoad={handleLoadImage}>
                {isLoad && <Loader />}
                <h2 className="gallery__title">{search}</h2>
                <div className="gallery__utils">
                    <ViewChanger />
                    <Pages lastPage={dataAPI.total_pages} />
                </div>
                <ul className={`gallery__container${classChange}`} >
                    {(
                        <>
                            {map.map(photo => (
                                <PhotoComp key={photo.id} photo={photo} />
                            ))}
                        </>
                    )}
                </ul>
                {isZoomModalOpen && (
                    <ZoomModal />
                )}
                {isPostModalOpen && (
                    <CreatePostModal />
                )}
                <Button
                    className='gallery__btn gallery__btn-show'
                    buttonType='dark'
                    onClick={showMore}
                >
                    SHOW MORE
                </Button>
                <Pages lastPage={dataAPI.total_pages} />
            </div>
        )
    }
}

export default Gallery
