import React, { useEffect, useState } from 'react';
import './styles.scss';
import ViewChanger from '../../components/ViewChanger';
import { getPosts } from '../../api/Firebase';
import BlogComponent from './BlogComp';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loading';
import Pages from '../../components/Pagination';
import Button from '../../components/Button';
import { selectBlogMorePage, selectBlogPage, selectBlogSorted, selectPostsMap } from '../../store/blog/blog.selector';
import { useNavigate, useParams } from 'react-router-dom';
import { setBlogMorePage, setBlogPage, setPostsMap } from '../../store/blog/blog.action';
import { selectClassChange } from '../../store/search/search.selector';

const Blog = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const sorted = useSelector(selectBlogSorted)
    const posts = useSelector(selectPostsMap)
    const [map, setMap] = useState()
    const [mapPerPages, setMapPerPages] = useState([])
    const [lastPage, setLastPage] = useState(null)
    const page = useSelector(selectBlogPage)
    const morePage = useSelector(selectBlogMorePage)
    const startIndex = (page - 1) * 10;
    const middleIndex = ((page + morePage) - 1) * 10;
    const endIndex = startIndex + 10;
    const [addMorePage, setAddMorePage] = useState(null)
    const classChange = useSelector(selectClassChange)

    //get data from API/sort data/if was on page - go to page
    useEffect(() => {
        document.title = 'Blog'
        const fetchData = async () => {
            const posts = await getPosts()
            if (sorted === 'new') {
                const newMap = posts.sort((a, b) => a.date - b.date).reverse()
                setMap(newMap)
            } else if (sorted === 'old') {
                const newMap = posts.sort((a, b) => a.date - b.date)
                setMap(newMap)
            } else {
                setMap(posts)
            }
        }
        fetchData()

        if (params.blog) {
            if (params.blog && params.page !== '1') {
                const pageValue = parseInt(params.page, 10)
                console.log(typeof (pageValue))
                console.log(pageValue)
                console.log(page)
                dispatch(setBlogPage(pageValue))
            }
        }
    }, [sorted])

    //
    useEffect(() => {
        navigate(`/blog/${page}`)
        if (map) {
            if (map.length >= 10) {
                setLastPage(Math.ceil(map.length / 10))
                setMapPerPages(map.filter((_, index) => index >= startIndex && index < endIndex));
                setAddMorePage(map.filter((_, index) => index >= middleIndex && index < (middleIndex + 10)))
                if (mapPerPages.length > 0) {
                    dispatch(setPostsMap(mapPerPages))
                }
            }
        } else {
        }
    }, [map, page])

    useEffect(() => {
        if (mapPerPages) {
            if (mapPerPages.length > 0) {
                dispatch(setPostsMap(mapPerPages))
            }
        }
    }, [mapPerPages, dispatch])
    useEffect(() => {
        if (map) {
            setAddMorePage(map.filter((_, index) => index >= middleIndex && index < (middleIndex + 10)))
        } else {
        }
    }, [morePage, page, map])

    const showMore = () => {
        dispatch(setBlogMorePage(morePage + 1))
        dispatch(setPostsMap([...posts, ...addMorePage]))
    };

    if (map) {
        const showHideButtons = () => {
            if (map.length >= 10 && !(page + morePage > lastPage)) {
                return true
            } else {
                return false
            }
        }
        return (
            <div className="blog">
                <h2 className="blog__title">Blog</h2>
                <h3 className="blog__subtitle">There are {map.length} posts</h3>
                <div className="blog__utils">
                    <ViewChanger />
                    {map.length >= 10 && <Pages lastPage={lastPage} />}
                </div>
                <ul className={`blog__container${classChange}`}>
                    {posts && posts.map((photo) => (
                        <BlogComponent key={photo.id} photo={photo} />
                    ))}
                </ul>
                {showHideButtons() &&
                    (
                        <Button className="blog__btn blog__btn-show"
                            buttonType="dark" onClick={showMore}>
                            SHOW MORE
                        </Button>
                    )}
                {map.length >= 10 && <Pages lastPage={lastPage} />}
            </div>
        );
    } else {
        return <Loader />;
    }
};

export default Blog;
