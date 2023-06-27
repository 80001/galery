import './styles.scss'
import { authModal, createModal, editModal, fullModal, zoomModal } from '../../store/modals/modals.selector'
import AuthorizationModal from './AuthorizationModal'
import ZoomModal from './ZoomModal'
import CreatePostModal from './CreatePostModal'
import FullPostModal from './FullPostModal'
import { useSelector } from 'react-redux'

const Modal = () => {
    const auth = useSelector(authModal)
    const zoom = useSelector(zoomModal)
    const create = useSelector(createModal)
    const full = useSelector(fullModal)
    const edit = useSelector(editModal)

    return (
        <>
            {auth.visible && <AuthorizationModal />}
            {zoom.visible && <ZoomModal params={zoom.params} />}
            {create.visible && <CreatePostModal params={create.params} />}
            {full.visible && <FullPostModal params={full.params} />}
            {edit.visible && <FullPostModal params={edit.params} />}
        </>
    )
}

export default Modal