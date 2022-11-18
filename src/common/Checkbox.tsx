interface PropsType {
    label: string
    register: any
}

const Checkbox = ({ label, register }: PropsType) => {
    return (
        <div>
            <input type="checkbox" {...register} />
            <label>{label}</label>
        </div>
    )
}

export default Checkbox