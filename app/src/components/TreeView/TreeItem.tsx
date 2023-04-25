import { TreeItem as MuiTreeItem, treeItemClasses, TreeItemProps } from "@mui/lab";
import { alpha, styled } from "@mui/material";
import { TransitionComponent } from ".";


export const TreeItem = styled((props: TreeItemProps ) => {

  return <MuiTreeItem
    {...props}
    TransitionComponent={TransitionComponent} />
})(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

