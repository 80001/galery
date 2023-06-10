import React, { useEffect, useState } from 'react'
import './styles.scss'
import ViewChanger from '../../components/ViewChanger'
import { getPosts } from '../../api/Firebase'
import BlogComponent from './BlogComp'
import { useSelector } from 'react-redux'
import { selectFullPost } from '../../store/modals/modals.selector'
import FullPostModal from '../../components/modal/FullPostModal'
import Loader from '../../components/Loading'

const Blog = () => {
    const fullPost = useSelector(selectFullPost)
    const [map, setMap] = useState()
    console.log(new Date())
    useEffect(() => {
        const fetchData = async () => {
            const posts = await getPosts()
            setMap(posts)
        }
        fetchData()
    }, [])
    if (map) {
        console.log(map)
        return (
            <div className="blog">
                <h2 className="blog__title">Blog</h2>
                <h3 className="blog__subtitle">There is {map.length} posts</h3>
                <div className="blog__utils">
                    <ViewChanger />
                </div>
                <ul className={`blog__container`}>
                    {(
                        <>
                            {map.map(photo => (
                                <BlogComponent key={photo.id} photo={photo} />
                            ))}
                        </>
                    )}
                </ul>
                {fullPost && <FullPostModal />}
            </div>
        )
    } else {
        return (<Loader />)
    }
}

export default Blog