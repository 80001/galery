import React, { useEffect, useState } from 'react';
import './styles.scss';
import ViewChanger from '../../components/ViewChanger';
import { getPosts } from '../../api/Firebase';
import BlogComponent from './BlogComp';
import { useDispatch, useSelector } from 'react-redux';
import { selectFullPostModal, selectPostId, selectPostMap } from '../../store/modals/modals.selector';
import FullPostModal from '../../components/modal/FullPostModal';
import Loader from '../../components/Loading';
import Pages from '../../components/Pagination';
import Button from '../../components/Button';
import { selectBlogMorePage, selectBlogPage } from '../../store/blog/blog.selector';
import { useNavigate, useParams } from 'react-router-dom';
import { setBlogMorePage, setBlogPage } from '../../store/blog/blog.action';
import { setPost, setPostMap } from '../../store/modals/modals.action';

const Blog = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const fullPost = useSelector(selectFullPostModal)
    const posts = useSelector(selectPostMap)
    const [map, setMap] = useState()
    const [mapPerPages, setMapPerPages] = useState([])
    const [lastPage, setLastPage] = useState(null)
    const page = useSelector(selectBlogPage)
    const morePage = useSelector(selectBlogMorePage)
    const startIndex = (page - 1) * 10;
    const middleIndex = ((page + morePage) - 1) * 10;
    const endIndex = startIndex + 10;
    const [addMorePage, setAddMorePage] = useState(null)


    const showMore = () => {
        dispatch(setPostMap([...posts, ...addMorePage]))
        dispatch(setBlogMorePage(morePage + 1))
    };
    //change title
    //get all posts
    //if page in params - setPage
    //else redirect to default page:1
    useEffect(() => {
        document.title = 'Blog'
        const fetchData = async () => {
            const posts = await getPosts()
            setMap(posts)
        }
        fetchData()
        dispatch(setBlogMorePage(1))
        if (params.blog) {
            if (params.blog && params.page) {
                const pageValue = parseInt(params.page, 10)
                dispatch(setBlogPage(pageValue))
            } else {
                navigate(`/blog/${page}`)
            }
        }
        // eslint-disable-next-line
    }, [])
    //change url if page changes
    //change maps if posts.length changes from 0
    useEffect(() => {
        navigate(`/blog/${page}`)
        if (map) {
            if (map.length >= 10) {
                console.log('map>10')
                setLastPage(Math.ceil(map.length / 10))
                setMapPerPages(map.filter((_, index) => index >= startIndex && index < endIndex));
                setAddMorePage(map.filter((_, index) => index >= middleIndex && index < (middleIndex + 10)))
                if (mapPerPages.length > 0) {
                    dispatch(setPostMap(mapPerPages))
                }
            }
        } else {
        }
        // eslint-disable-next-line
    }, [map, page])

    useEffect(() => {
        if (mapPerPages) {
            if (mapPerPages.length > 0) {
                dispatch(setPostMap(mapPerPages))
            }
        }
    }, [mapPerPages, dispatch])
    useEffect(() => {
        if (map) {
            setAddMorePage(map.filter((_, index) => index >= middleIndex && index < (middleIndex + 10)))
        } else {
        }
        // eslint-disable-next-line
    }, [morePage, page, map])

    if (map) {
        const showHideButtons = () => {
            if (map.length >= 10 && !(page + morePage > lastPage)) {
                console.log(page, morePage, lastPage)
                return true
            } else {
                return false
            }
        }
        console.log(posts)
        return (
            <div className="blog">
                <h2 className="blog__title">Blog</h2>
                <h3 className="blog__subtitle">There are {map.length} posts</h3>
                <div className="blog__utils">
                    <ViewChanger />
                    {map.length >= 10 && <Pages lastPage={lastPage} />}
                </div>
                <ul className="blog__container">
                    {posts && posts.map((photo) => (
                        <BlogComponent key={photo.id} photo={photo} />
                    ))}
                </ul>
                {showHideButtons() &&
                    (
                        <Button className="gallery__btn gallery__btn-show"
                            buttonType="dark" onClick={showMore}>
                            SHOW MORE
                        </Button>
                    )}
                {map.length >= 10 && <Pages lastPage={lastPage} />}
                {fullPost && <FullPostModal />}
            </div>
        );
    } else {
        return <Loader />;
    }
};

export default Blog;
