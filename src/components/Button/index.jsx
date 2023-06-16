import './styles.scss'

const BUTTON_TYPES = {
    default: 'default',
    dark: 'dark',
    white: 'white',
    anime: 'anime'
}
const Button = ({ children, buttonType = 'default', className = '', ...otherProps }) => {
    return (
        <button className={`${className} button button--${BUTTON_TYPES[buttonType]}`}{...otherProps}>
            <p>{children}</p>
        </button>
    )
}

export default Button