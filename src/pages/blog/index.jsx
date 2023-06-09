import React, { useEffect, useState } from 'react'
import './styles.scss'
import ViewChanger from '../../components/ViewChanger'
import { getPosts } from '../../api/Firebase'
import BlogComponent from './BlogComp'

const Blog = () => {
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
            </div>
        )
    }
}

export default Blog