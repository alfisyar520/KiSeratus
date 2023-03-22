import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { CalendarIcon, DragHandleIcon, AtSignIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <ListItem>
        <NavLink to="/">
          <ListIcon as={DragHandleIcon} color="white" />
          Dashboard
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="jadwal">
          <ListIcon as={CalendarIcon} color="white" />
          Jadwal
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/silsilah-keluarga">
          <ListIcon as={AtSignIcon} color="white" />
          Keluarga
        </NavLink>
      </ListItem>
    </List>
  );
}
