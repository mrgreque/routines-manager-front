import { Box } from "@mui/material";
import { palette } from "../theme/palette";

export interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    disabled?: boolean;
}

function Input(props: InputProps) {
    return (
        <Box 
        sx={{
            display: "flex",
            padding: "10px",
            backgroundColor: palette.transparent.main,
            color: palette.primary.main,
            borderRadius: "10px",
            width: props.width || "200px",
            transition: "all 0.3s",
            cursor: "pointer",
            boxShadow: "1px 3px 5px 0px rgba(98, 133, 135,0.7)",
            "&:hover": {
                transform: "scale(1.01)",
                border: `1px solid ${palette.primary.main}`,
            }
        }}>
            <input 
                style={{
                    width: "100%",
                    border: "none",
                    fontSize: "0.9em",
                    backgroundColor: "transparent",
                    outline: "none",
                }}
                type={props.type} 
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled || false}
            />
        </Box>
    )
};

export { Input };