import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { setModal } from '../../store/modals/modals.action'
import { selectAuthModal, selectCreatePostModal, selectEditPostModal, selectFullPostModal, selectZoomModal } from '../../store/modals/modals.selector'
import AuthorizationModal from './AuthorizationModal'
import ZoomModal from './ZoomModal'
import CreatePostModal from './CreatePostModal'
import FullPostModal from './FullPostModal'

const Modal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector(selectAuthModal)
    const zoom = useSelector(selectZoomModal)
    const create = useSelector(selectCreatePostModal)
    const full = useSelector(selectFullPostModal)
    const edit = useSelector(selectEditPostModal)

    return (
        <div className='bg-modal'>
            {auth && <AuthorizationModal />}
            {zoom && <ZoomModal />}
            {create && <CreatePostModal />}
            {full && <FullPostModal />}
            {edit && <FullPostModal />}
        </div>
    )
}

export default Modal