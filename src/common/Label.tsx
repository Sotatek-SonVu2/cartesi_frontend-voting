
interface PropsType {
    children: string
    required?: boolean
}

const Label = ({ children, required }: PropsType) => {
    return (
        <label>
            {children}
            {required && <span style={{ color: 'red' }}>*</span>}
        </label>
    )
}

export default Label