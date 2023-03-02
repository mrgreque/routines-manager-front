import { Button } from "@mui/material";
import { palette } from "../theme/palette";

export interface ActionButtonsProps {
    onClickCancel: () => void;
    onClickEdit: () => void;
    onClickSave: () => void;
    editing: boolean;
}

function ActionButtons(props: ActionButtonsProps) {
    return (
        <div
            style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            <Button
                onClick={props.onClickCancel}
                disabled={!props.editing}
                sx={{
                    color: palette.primary.main,
                    marginRight: "10px",
                    "&:disabled": {
                        color: "gray",
                    }
                }}
            >Cancelar</Button>
            <Button
                onClick={props.onClickEdit}
                disabled={props.editing}
                variant="outlined"
                sx={{
                    color: palette.primary.main,
                    borderColor: palette.primary.main,
                    marginRight: "10px",
                    "&:hover": {
                        color: palette.primary.main,
                        borderColor: palette.primary.main,
                    },
                    "&:disabled": {
                        color: "gray",
                    }
                }}
            >Editar</Button>
            <Button
                onClick={props.onClickSave}
                disabled={!props.editing}
                variant="contained"
                sx={{
                    color: palette.primary.contrastText,
                    backgroundColor: palette.primary.main,
                    "&:hover": {
                        backgroundColor: palette.secondary.main,
                        color: palette.primary.contrastText,
                    },
                    "&:disabled": {
                        color: "gray",
                    }
                }}
            >Salvar</Button>
        </div>
    )
};

export { ActionButtons };