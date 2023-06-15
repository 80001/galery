import React, { useEffect, useState } from 'react';
import './styles.scss';
import ViewChanger from '../../components/ViewChanger';
import { getPosts } from '../../api/Firebase';
import BlogComponent from './BlogComp';
import { useDispatch, useSelector } from 'react-redux';
import { selectFullPost } from '../../store/modals/modals.selector';
import FullPostModal from '../../components/modal/FullPostModal';
import Loader from '../../components/Loading';
import Pages from '../../components/Pagination';
import Button from '../../components/Button';
import { setMorePage } from '../../store/search/search.action';
import { selectBlogMorePage, selectBlogPage } from '../../store/blog/blog.selector';
import { useNavigate, useParams } from 'react-router-dom';
import { setBlogPage } from '../../store/blog/blog.action';

const Blog = () => {
    const dispatch = useDispatch();
    const params = useParams()
    const navigate = useNavigate()
    const fullPost = useSelector(selectFullPost);
    const [map, setMap] = useState();
    const [mapPerPages, setMapPerPages] = useState([]);
    const [lastPage, setLastPage] = useState(null);
    const [filteredMap, setFilteredMap] = useState([]);
    const page = useSelector(selectBlogPage);
    const morePage = useSelector(selectBlogMorePage);
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const addMoreMap = map?.filter((_, index) => index >= (startIndex + 10) && index < (endIndex + 10));

    const showMore = () => {
        setFilteredMap([...filteredMap, ...addMoreMap]);
        dispatch(setMorePage(morePage + 1));
    };
    useEffect(() => {
        document.title = 'Blog';
        const fetchData = async () => {
            const posts = await getPosts();
            setMap(posts);
        };
        fetchData();

        if (params.blog) {
            if (params.blog && params.page) {
                const pageValue = parseInt(params.page, 10)
                dispatch(setBlogPage(pageValue))
            } else {
                navigate(`/blog/${page}`)
            }
        }
    }, [])

    useEffect(() => {
        if (map) {
            if (map.length >= 10) {
                dispatch(setMorePage(1))
                setLastPage(Math.ceil(map.length / 10));
                setMapPerPages(map.filter((_, index) => index >= startIndex && index < endIndex));
            }
        }
        navigate(`/blog/${page}`)
    }, [map, page]);
    useEffect(() => {
        setFilteredMap(mapPerPages)
    }, [mapPerPages])

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
                <ul className="blog__container">
                    {filteredMap.map((photo) => (
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
