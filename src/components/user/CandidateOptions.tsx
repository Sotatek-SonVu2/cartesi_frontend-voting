
import { ChangeEvent } from "react"
import { ErrorText, Input, OptionLabel, TextArea, Wrapper } from "styled/form"
import { PrimaryButton } from "styled/common"
import TrashIcon from 'images/trash.svg'
import { randomColor } from "utils/common"
import { OptionType } from "utils/interface"
import { validateField } from "utils/validate"

interface PropsType {
    options: OptionType[],
    setOptions: Function
}

const CandidateOptions = ({ options, setOptions }: PropsType) => {
    const OptionDefault: OptionType = {
        name: '',
        brief_introduction: '',
        avatar: '',
        formErrors: { name: '', brief_introduction: '' },
    }

    const addOption = () => {
        setOptions([...options, OptionDefault])
    }

    const removeOption = (index: number) => {
        if (options.length <= 1) return
        const data = options.filter((_, idx) => idx !== index)
        setOptions(data)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const validate = validateField(name, value)
        const data: any = [...options]
        data[index][name] = value;
        data[index]['avatar'] = randomColor();
        data[index].formErrors = { ...data[index].formErrors, ...validate }
        setOptions(data);
    };

    return (
        <Wrapper>
            {options.map((option: OptionType, index: number) => (
                <div key={index}>
                    <OptionLabel>
                        <label>Option {index + 1}</label>
                        {options.length > 1 && (
                            <img src={TrashIcon} alt="trash icon" width={25} onClick={() => removeOption(index)} />
                        )}
                    </OptionLabel>
                    <Input
                        type="text"
                        value={option.name}
                        name="name"
                        placeholder="Option's name.."
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)} />
                    <ErrorText>{option.formErrors.name}</ErrorText>
                    <TextArea
                        name="brief_introduction"
                        value={option.brief_introduction}
                        placeholder="Brief Introduction..."
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e, index)} />
                    <ErrorText>{option.formErrors.brief_introduction}</ErrorText>
                </div>
            ))}
            <PrimaryButton type="button" onClick={addOption}>Add Option</PrimaryButton>
        </Wrapper>
    )
}

export default CandidateOptions