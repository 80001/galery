import { useState } from "react"

const PhotoComp = ({ photo }) => {
    const { user, urls, width, height, links } = photo
    const { modal, setModal } = useState(false)

    const dwnld = `Size: ${width}x${height}`
    const handleComments = (e) => {
        setModal(!modal)
    }

    return (
        <li className={`galery__item`}>
            <div className="galery__item-view">
                <img
                    src={urls.regular}
                    alt="img"
                    onClick={handleComments}
                    className="galery__img"
                />
                <a
                    href={links.download}
                    className="galery__download"
                    title={dwnld}
                >Down⌊✓⌋load</a>
                <a
                    href={`https://unsplash.com/@${user.username}`}
                    target='_blank'
                    title="Author"
                    rel="noreferrer"
                    className="galery__credit">{user.name}
                </a>
            </div>
        </li>
    )
}
export default PhotoComp