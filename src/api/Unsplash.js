import { createApi } from "unsplash-js";
import { accessKey } from "../configs/UpscalesConfig";
import { useEffect, useState } from "react";

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
    useEffect(() => {
        unsplash.search.getPhotos({
            query: 'star wars',
            page: 1,
            perPage: 10,
            orientation: 'landscape',
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
    }, [])
    return data
}
