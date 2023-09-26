import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  List,
  ListItemButton,
} from "@mui/material";

const Link = React.forwardRef(
  (
    props: MuiLinkProps & RouterLinkProps,
    ref: React.Ref<HTMLAnchorElement>,
  ) => <MuiLink component={RouterLink} {...props} ref={ref} />,
);

export const LinkList = ({ items }: { items: { [text: string]: string } }) => {
  return (
    <List>
      {Object.keys(items).map((text) => (
        <ListItemButton component={Link} to={items[text]} key={text}>
          {text}
        </ListItemButton>
      ))}
    </List>
  );
};
