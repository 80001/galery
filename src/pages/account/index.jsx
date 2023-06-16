import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selector';
import { setAuthorizationModal } from '../../store/modals/modals.action';
import Loader from '../../components/Loading';
import './styles.scss';
import Button from '../../components/Button'
import { dayOnSite, lastLogin } from '../../utils/utils';
import { getPostsByEmail } from '../../api/Firebase';
import AccountPost from './Post';
import { selectFullPostModal } from '../../store/modals/modals.selector';
import FullPostModal from '../../components/modal/FullPostModal';
import ChangePostModal from '../../components/modal/ChangePostModal';

const Account = () => {
    const dispatch = useDispatch();
    const modal = useSelector(selectFullPostModal)
    const author = useSelector(selectUser);
    const [authorPhoto, setAuthorPhoto] = useState('https://otkritkis.com/wp-content/uploads/2022/06/ra8je.jpg');
    const [showMy, setShowMy] = useState(true)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        document.title = 'Account';
        if (!author && !window.location.pathname.includes('auth')) {
            dispatch(setAuthorizationModal(true));
        } else if (author && !window.location.pathname.includes('auth')) {
            dispatch(setAuthorizationModal(false));
        } else if (author && author.photoURL.startsWith('https://')) {
            setAuthorPhoto(author.photoURL);
        } else {
            window.history.pushState(null, '', '/account');
        }
    }, [author, dispatch]);

    const { createdAt, displayName, email, lastLoginAt } = author || {};

    useEffect(() => {
        if (author) {
            const fetchPosts = async () => {
                const myPosts = await getPostsByEmail(email)
                console.log(myPosts)
                setPosts(myPosts)
            }
            fetchPosts()
        }
    }, [email, author])

    if (!author) {
        return <Loader />
    }


    const daysReg = dayOnSite(createdAt)
    const lastTime = lastLogin(lastLoginAt)

    return (
        <section className="account">
            <div className="account-main">
                <h2 className="account-main__title">
                    Welcome <span>{displayName}!</span> Glory to your balls!
                </h2>
                <h3 className="account-main__email">
                    Email: <span>{email}</span>
                </h3>
                <h4 className="account-main__created">
                    Registered <span>{daysReg}</span> days ago!
                </h4>
                <h4 className="account-main__login">
                    <span>Last login: {lastTime}</span> hours
                </h4>
                <img className="account-main__avatar" src={authorPhoto} alt={displayName} />
            </div>
            <div className="account-child">
                <h2 className='account-main__title'>
                    My Posts, Comments, Nudes
                </h2>
                <div className="account-child__my">
                    <div className="account-child__my-switch">
                        <Button className="account-child__my-title"
                            buttonType='dark'
                            disabled={showMy}
                            onClick={() => setShowMy(true)}>Show Posts</Button>
                        <Button className="account-child__my-title"
                            disabled={!showMy}
                            buttonType='dark'
                            onClick={() => setShowMy(false)}>Show Comments</Button>
                    </div>
                    <div className="account-child__my-work">
                        {showMy
                            ? <div className="show-my">
                                <h3 className="show-my__title">My posts</h3>
                                <ul className="show-my__body">
                                    {posts && posts.map(post => (
                                        <AccountPost post={post} id={post.id} />
                                    ))}
                                </ul>
                            </div>
                            : <div className="show-my">Немає поки коментарів!
                                <ChangePostModal />
                            </div>
                        }
                        {modal && <FullPostModal />}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Account;
