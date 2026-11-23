import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

// Caixa de confirmação usada antes de excluir uma série
function ConfirmDialog({
  aberto,
  titulo,
  mensagem,
  textoConfirmar = "Confirmar",
  carregando = false,
  onConfirmar,
  onCancelar,
}) {
  return (
    <Dialog open={aberto} onClose={carregando ? undefined : onCancelar} maxWidth="xs" fullWidth>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText>{mensagem}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancelar} color="inherit" disabled={carregando}>
          Cancelar
        </Button>
        <Button onClick={onConfirmar} variant="contained" loading={carregando}>
          {textoConfirmar}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
