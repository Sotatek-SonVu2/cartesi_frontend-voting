import MDEditor from "@uiw/react-md-editor"
import { useState } from "react"
import { ShowText } from "styled/common"

interface PropsType {
    text: string
}

const MAX_LENGTH = 400

const Markdown = ({ text }: PropsType) => {
    const [isShowText, setIsShowText] = useState<boolean>(false)

    return (
        <div data-color-mode="dark" >
            <MDEditor.Markdown
                source={text}
                style={{
                    backgroundColor: 'transparent',
                    fontSize: '13px',
                }}
                className={!isShowText && text.length > MAX_LENGTH ? 'show-less' : 'show-more'}
            />
            {text.length > MAX_LENGTH && (
                <ShowText onClick={() => setIsShowText(!isShowText)}>{!isShowText ? 'Show more...' : 'Show less'}</ShowText>
            )}
        </div>
    )
}

export default Markdown