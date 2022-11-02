
import ReactTooltip from "react-tooltip";
import { TooltipWrapper } from "styled/common";

interface PropsType {
    children: JSX.Element,
    text: string,
    id: string,
    placement?: 'top' | 'right' | 'bottom' | 'left',
    className?: string //'tooltip-sz-md' | 'tooltip-sz-sm' | 'tooltip-sz-max' | 'tooltip-modal ' | 'tooltip-admin-icon' (index.css)
    type?: 'dark' | 'success' | 'warning' | 'error' | 'info' | 'light';
}

const Tooltip = ({ children, text, id, placement = "bottom", className = 'tooltip-sz-md', type = "light" }: PropsType) => {
    return (
        <TooltipWrapper data-tip data-for={id} data-padding='5px'>
            {children}
            <ReactTooltip
                id={id}
                place={placement}
                effect="solid"
                type={type}
                className={className}
            >
                {text}
            </ReactTooltip>
        </TooltipWrapper>
    )
}

export default Tooltip