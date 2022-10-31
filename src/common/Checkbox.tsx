interface PropsType {
    label: string
    onChange: any
    checked: boolean
}

const Checkbox = ({ label, onChange, checked }: PropsType) => {
    return (
        <div>
            <input type="checkbox" onChange={onChange} checked={checked} />
            <label>{label}</label>
        </div>
    )
}

export default Checkbox