import React, { useEffect } from 'react';
import Button from '.';

const ButtonToTop = () => {
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

    return (
        <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="button__to-top"
            buttonType="white"
        >
            Scroll↑↟↑Top
        </Button>
    );
};

export default ButtonToTop;
