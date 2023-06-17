import React, { useEffect } from 'react';
import Button from '.';

const ButtonToTop = ({ reffer }) => {
    useEffect(() => {
        const handleScroll = () => {
            const button = document.querySelector('.button__to-top');
            button.classList.toggle('button__to-top-show', window.scrollY >= 500);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toTop = () => {
        reffer.current.scrollIntoView({ top: 0, behavior: 'smooth' })
    }

    return (
        <Button
            onClick={toTop}
            className="button__to-top"
            buttonType="white"
        >
            Scroll↑↟↑Top
        </Button>
    );
};

export default ButtonToTop;
