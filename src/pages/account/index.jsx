import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../store/user/user.selector';
import Loader from '../../components/Loading';
import './styles.scss';
import Button from '../../components/Button';
import { dayOnSite, lastLogin } from '../../utils/utils';
import { getPostsByEmail } from '../../api/Firebase';
import AccountPost from './Post';
import { setPostsAuthMap } from '../../store/blog/blog.action';

const Account = () => {
    const dispatch = useDispatch();
    const author = useSelector(selectAuth);
    const authorPhoto = 'https://otkritkis.com/wp-content/uploads/2022/06/ra8je.jpg'
    const [showMy, setShowMy] = useState(true);
    const [posts, setPosts] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    document.title = 'Account';

    const { createdAt, displayName, email, lastLoginAt } = author || {};

    useEffect(() => {
        if (author) {
            const fetchPosts = async () => {
                const myPosts = await getPostsByEmail(email)
                setPosts(myPosts)
            }
            fetchPosts();
        }

    }, [author, email, dispatch]);

    useEffect(() => {
        if (posts !== null) {
            dispatch(setPostsAuthMap(posts))
        }
    }, [posts])

    if (!author) {
        return <Loader />;
    }

    const daysReg = dayOnSite(createdAt);
    const lastTime = lastLogin(lastLoginAt);
    if (posts) {
        const filteredPosts = searchTerm
            ? posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : posts;

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
                    <h2 className="account-main__title">My Posts, Comments, Nudes</h2>
                    <div className="account-child__my">
                        <div className="account-child__my-switch">
                            <Button
                                className="account-child__my-title"
                                buttonType="dark"
                                disabled={showMy}
                                onClick={() => setShowMy(true)}
                            >
                                Show Posts
                            </Button>
                            <Button
                                className="account-child__my-title"
                                disabled={!showMy}
                                buttonType="dark"
                                onClick={() => setShowMy(false)}
                            >
                                Show Comments
                            </Button>
                        </div>
                        <div className="account-child__my-work">
                            {showMy ? (
                                <div className="show-my">
                                    <h3 className="show-my__title">My posts: {filteredPosts.length} post</h3>
                                    <div className="show-my__search">
                                        <label htmlFor="search" className="show-my__search-label">
                                            Search:
                                        </label>
                                        <input
                                            type="text"
                                            className="show-my__search-input"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    {filteredPosts.length > 0 ? (
                                        <ul className="show-my__body">
                                            {filteredPosts.map((post) => (
                                                <AccountPost post={post} key={post.id} />
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="show-my__title">There are no posts.</p>
                                    )}
                                </div>
                            ) : (
                                <div className="show-my">
                                    Немає поки коментарів!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
};

export default Account;
