import {
  BoxProps,
  FadeProps,
  IconButtonProps,
  ModalProps,
  TypographyProps,
} from '@mui/material';
import { ComponentType, ReactNode } from 'react';

export type TransitionModalProps = {
  children: ReactNode;
  open: boolean;
  title: string;
  width?: number;
  maxHeight?: number;
  footerComponent?: React.ReactNode;
  handleClose: () => void;
  titleLine?: boolean;
};

export const createTransitionModal = <P extends ModalProps>(
  Component: ComponentType<P>,
  Fade: ComponentType<FadeProps>,
  Box: ComponentType<BoxProps>,
  IconButton: ComponentType<IconButtonProps>,
  CancelIcon: ComponentType<any>,
  Typography: ComponentType<TypographyProps>
) => {
  return (props: P & TransitionModalProps) => {
    const { children, open, title, width, footerComponent, handleClose, titleLine, maxHeight = 500 } =
      props;

    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: width || 600,
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: 1,
      overflow: "hidden"
    };

    return (
      <Component
        {...(props as P)}
        open={open}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ zIndex: 20000 }}
      >
        <Fade in={open}>
          <Box
            // width={width || 600}
            // bgcolor={'#fff'}
            // borderRadius={1}
            // overflow="hidden"
            sx={style}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              p={2}
              sx={{ borderBottom: titleLine ? '1px solid rgba(0,0,0,0.12)' : undefined }}
            >
              <Typography>{title}</Typography>
              <IconButton size="small" onClick={handleClose}>
                <CancelIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box maxHeight={maxHeight} width="auto" overflow={'auto'}>
              {children}
            </Box>
            {footerComponent && (
              <Box
                p={2}
                sx={{ borderTop: '1px solid rgba(0,0,0,0.12)' }}
              //   bgcolor={Colors.rowHover}
              >
                {footerComponent}
              </Box>
            )}
          </Box>
        </Fade>
      </Component>
    );
  };
};

