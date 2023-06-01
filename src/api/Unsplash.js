import { createApi } from "unsplash-js";
import { accessKey } from "../configs/UpscalesConfig";
import { useEffect, useState } from "react";
import { selectMorePage, selectPage, selectPerPage, selectSearch, selectorientation } from "../store/search/search.selector";
import { useDispatch, useSelector } from "react-redux";
import { setMorePage } from "../store/search/search.action";

const unsplash = createApi({
    accessKey: accessKey,
})

const dataTemplate = {
    results: [],
    total: 0,
    total_pages: 0,
}
export const DefaultUnsplashAPI = () => {
    const [data, setData] = useState(dataTemplate);
    const query = 'star wars'
    const page = '1'
    const orientation = 'landscape'


    useEffect(() => {
        unsplash.search.getPhotos({
            query,
            page,
            orientation,
        }).then(result => {
            console.log(page)
            switch (result.type) {
                case 'success':
                    setData(result.response)
                    break
                default:
                    console.log('error occurred: ', result.errors[0])
                    break
            }
        })
    }, [])
    return data
}

export const UnsplashAPI = () => {
    const dispatch = useDispatch
    const [data, setData] = useState(dataTemplate)
    const query = useSelector(selectSearch)
    const page = useSelector(selectPage)
    const perPage = useSelector(selectPerPage)
    const orientation = useSelector(selectorientation)
    console.log('main images map', page)
    dispatch(setMorePage(1))

    useEffect(() => {
        unsplash.search.getPhotos({
            query,
            page,
            perPage,
            orientation,
        }).then(result => {
            switch (result.type) {
                case 'success':
                    setData(result.response)
                    break
                default:
                    console.log('error occurred: ', result.errors[0])
                    break
            }
        })
    }, [query, page, perPage, orientation])
    return data
}

export const ShowMoreImage = () => {
    const [data, setData] = useState(dataTemplate);
    const query = useSelector(selectSearch)
    let page = useSelector(selectPage) + useSelector(selectMorePage)
    console.log('show more', page)

    useEffect(() => {
        unsplash.search.getPhotos({
            query,
            page,
            orientation: 'landscape'
        }).then(result => {
            switch (result.type) {
                case 'success':
                    setData(result.response)
                    break
                default:
                    console.log('error occurred: ', result.errors[0])
                    break
            }
        })
    }, [page])
    return data.results
}

export const UnsplashImage = ({ imageId }) => {
    const [data, setData] = useState(null)
    console.log('show one image')
    useEffect(() => {
        unsplash.photos.get({ photoId: imageId })
            .then(photo => setData(photo))
    }, [])
    return data
}

export const ShowRandomImages = () => {
    const [data, setData] = useState(null);
    console.log('random images')

    useEffect(() => {
        unsplash.photos
            .getRandom({ count: 10, orientation: 'landscape' })
            .then(response => {
                setData(response);
                console.log(response);
            })
            .catch(error => {
                console.log('Error fetching random photos:', error);
            });
    }, []);

    return data
};
