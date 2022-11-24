import { PrimaryButton } from "styled/common"
import { ErrorText, Input, OptionLabel, TextArea, Wrapper } from "styled/form"
import TrashIcon from 'images/trash.svg';
import styled from "styled-components";
import Label from "common/Label";

interface PropsType {
    fields: any,
    register: any
    errors: any
    onAdd: () => void
    onRemove: (index: number) => void
}

const AddButton = styled(PrimaryButton)`
    margin-top: 10px;
`

const CandidateOptions = ({ fields, register, errors, onAdd, onRemove }: PropsType) => {
    return (
        <>
            <Wrapper>
                <Label required>Candidate options:</Label>
                {fields.map((_: any, index: number) => (
                    <div key={index}>
                        <OptionLabel>
                            <Label required>{`Option ${index + 1}:`}</Label>
                            {fields.length > 1 && (
                                <img src={TrashIcon} alt="trash icon" width={25} onClick={() => onRemove(index)} />
                            )}
                        </OptionLabel>
                        <Input
                            type="text"
                            {...register(`options.${index}.name`)}
                            placeholder="Option's name.."
                        />
                        <ErrorText>{errors?.options?.[index]?.name?.message}</ErrorText>
                        <TextArea
                            {...register(`options.${index}.brief_introduction`)}
                            placeholder="Brief Introduction..."
                        />
                        <ErrorText>{errors?.options?.[index]?.brief_introduction?.message}</ErrorText>
                    </div>
                ))}
            </Wrapper>
            <AddButton type="button" onClick={onAdd}>Add Option</AddButton>
        </>
    )
}

export default CandidateOptions