"use client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ConfirmDialog({
  open, title, content, onClose, onConfirm, confirmText = "ยืนยัน", cancelText = "ยกเลิก"
}: {
  open: boolean; title: string; content?: string | React.ReactNode;
  onClose: () => void; onConfirm: () => void;
  confirmText?: string; cancelText?: string;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {typeof content === "string" ? <Typography>{content}</Typography> : content}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm} variant="contained" color="error">{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
}
