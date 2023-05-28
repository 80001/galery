import { createApi } from "unsplash-js";
import { accessKey } from "../configs/UpscalesConfig";
import { useEffect, useState } from "react";
import { selectPage, selectPerPage, selectSearch, selectorientation } from "../store/search/search.selector";
import { useSelector } from "react-redux";

const unsplash = createApi({
    accessKey: accessKey,
})

const dataTemplate = {
    results: [],
    total: 0,
    total_pages: 0,
}

export const UnsplashAPI = () => {
    const [data, setData] = useState(dataTemplate);
    const query = useSelector(selectSearch)
    const page = useSelector(selectPage)
    const perPage = useSelector(selectPerPage)
    const orientation = useSelector(selectorientation)


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
    }, [query])
    return data
}

export const UnsplashImage = (imageId) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        unsplash.photos.get({ photoId: imageId })
            .then(photo => setData(photo))
    }, [])
    return data
}