import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selector';
import { setAuthorizationModal } from '../../store/modals/modals.action';

const Account = () => {
    const dispatch = useDispatch()
    const author = useSelector(selectUser)
    const ask = () => {
        const confirmed = window.confirm('You need to authorization to create post!')
        if (confirmed) {
            dispatch(setAuthorizationModal(true))
        } else {
            window.history.back()
        }
    };
    if (!author) {
        ask()
    } else {
        return (
            <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad? Quo, quasi! Dolore commodi esse reprehenderit facere in error blanditiis voluptatum asperiores eius ea. Corrupti vitae at ex explicabo eveniet?
            </div>
        )
    }
}

export default Account