import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostById } from '../../api/Firebase'
import Loader from '../../components/Loading'
import { timeChanger } from '../../utils/utils'

const FullPost = () => {
    const { id: postId } = useParams()
    const [img, setImg] = useState(null)
    const [isLoad, setIsLoad] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            const post = await getPostById(postId)
            setImg(post)
        }
        fetchData()
    }, [postId])
    console.log(img)
    if (img) {
        const { title, subtitle, image, text, date, author } = img
        const formattedDate = timeChanger(date)
        const handleLoadImage = () => {
            setIsLoad(false)
        }

        return (
            <div className="post-page__view" onLoad={handleLoadImage}>
                {isLoad && <Loader />}
                <div className="post-page__view-top">
                    <h4 className="post-page__view-titles">Subtitle:</h4>
                    <h4 className="post-page__view-titles">Title:</h4>
                    <h4 className="post-page__view-titles">Created at:</h4>
                    <span className="post-page__view-subtitle buttons">{subtitle}</span>
                    <span className="post-page__view-title buttons">{title}</span>
                    <span className="post-page__view-date buttons">{formattedDate}</span>
                </div>
                <img
                    src={image}
                    alt={title}
                    className="post-page__view-img"
                    title="SHOW FULL POST"
                />
                <div className="post-page__view-bottom">
                    <h4 className="post-page__view-titles">Descriptions:</h4>
                    <h4 className="post-page__view-titles">Author:</h4>
                    <span className="post-page__view-text buttons">{text}</span>
                    <span className="post-page__view-author buttons">{author}</span>
                </div>
            </div>
        )
    }
}

export default FullPost