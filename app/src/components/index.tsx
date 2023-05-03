import { Box, Fade, IconButton, Modal, Typography, TextField as MuiTextField } from "@mui/material";
import { createTransitionModal } from "./hoc/createTransitionsModal";

import CancelIcon from "@mui/icons-material/Cancel";
import { createTextField } from "./hoc/createTextField";

export const TransitionsModal = createTransitionModal(Modal, Fade, Box, IconButton, CancelIcon, Typography);
export const TextField = createTextField(MuiTextField);