import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostById, getPosts } from '../../api/Firebase'
import Loader from '../../components/Loading'
import { timeChanger } from '../../utils/utils'
import { useSelector } from 'react-redux'
import { selectBlogSorted } from '../../store/blog/blog.selector'

const FullPost = () => {
    const { id: postId } = useParams()
    const [post, setPost] = useState(null)
    const [findPost, setFindPost] = useState(null)
    const [map, setMap] = useState()
    const [isLoad, setIsLoad] = useState(true)
    const sorted = useSelector(selectBlogSorted)

    useEffect(() => {
        const fetchData = async () => {
            const post = await getPostById(postId)
            const posts = await getPosts(sorted)
            setPost(post)
            setMap(posts)
        }
        fetchData()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (map) {
            const x = map.findIndex((obj) => obj.id === postId)
            setPost(map[x])
            setFindPost(x)
        }

    }, [map, postId])
    useEffect(() => {
        if (findPost) {
            window.history.replaceState(null, '', `${post.id}`)
        }
    }, [findPost, post.id])

    const nextPost = () => {
        if (findPost === map.length - 1) {
            setPost(map[0])
            setFindPost(0)
        } else {
            const nextPost = map[findPost + 1]
            if (nextPost) {
                setPost(map[findPost + 1])
                setFindPost(findPost + 1)
            }
        }
    }

    const prewPost = () => {
        if (findPost === 0) {
            setPost(map[map.length - 1])
            setFindPost(map.length - 1)
        } else {
            const prewPost = map[findPost - 1]
            if (prewPost) {
                setPost(map[findPost - 1])
                setFindPost(findPost - 1)
            }
        }
    }

    if (post) {
        const { title, subtitle, image, text, date, author } = post
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
                <span className='post-page__view-image-prew'
                    placeholder='previous'
                    onClick={prewPost} disabled>
                    <svg width="32" height="32"
                        viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                        <desc lang="en-US">Chevron left</desc>
                        <path d="M15.5 18.5 14 20l-8-8 8-8 1.5 1.5L9 12l6.5 6.5Z">
                        </path>
                    </svg>
                </span>
                <img
                    src={image}
                    alt={title}
                    className="post-page__view-img"
                    title="SHOW FULL POST"
                />
                <span className='post-page__view-image-next'
                    placeholder='next' onClick={nextPost}>
                    <svg width="32" height="32"
                        viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                        <desc lang="en-US">Chevron right</desc>
                        <path d="M8.5 5.5 10 4l8 8-8 8-1.5-1.5L15 12 8.5 5.5Z">
                        </path>
                    </svg>
                </span>
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