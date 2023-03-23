import { List, ListItem, ListIcon } from "@chakra-ui/react";
import {
  CalendarIcon,
  DragHandleIcon,
  AtSignIcon,
  QuestionIcon,
  InfoIcon,
  PlusSquareIcon,
  ChatIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem('USER'));
  // console.log(user.roles)
  // list user = all, jadwalKeluarga, formUnikFormula, formCanggihTabel
  const [ruleUser, setRuleUser] = useState("all");
  console.log(user)
  if (user?.roles === "jadwalKeluarga") {
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
            Jadwal 4.0
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="silsilah-keluarga">
            <ListIcon as={AtSignIcon} color="white" />
            Silsilah Keluarga
          </NavLink>
        </ListItem>
      </List>
    );
  } else if (user?.roles === "formUnikFormula") {
    return (
      <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>
          <NavLink to="/">
            <ListIcon as={DragHandleIcon} color="white" />
            Dashboard
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="form-unik">
            <ListIcon as={PlusSquareIcon} color="white" />
            Form Unik
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="formula-generator">
            <ListIcon as={QuestionIcon} color="white" />
            Formula Generator
          </NavLink>
        </ListItem>
      </List>
    );
  } else if (user?.roles === "formCanggihTabel") {
    return (
      <List color="white" fontSize="1.2em" spacing={4}>
        <ListItem>
          <NavLink to="/">
            <ListIcon as={DragHandleIcon} color="white" />
            Dashboard
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="form-canggih">
            <ListIcon as={ChatIcon} color="white" />
            Form Canggih
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="form-canggih">
            <ListIcon as={HamburgerIcon} color="white" />
            Tabel 4.0
          </NavLink>
        </ListItem>
      </List>
    );
  } else {
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
            Jadwal 4.0
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="silsilah-keluarga">
            <ListIcon as={AtSignIcon} color="white" />
            Silsilah Keluarga
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="form-unik">
            <ListIcon as={PlusSquareIcon} color="white" />
            Form Unik
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="formula-generator">
            <ListIcon as={QuestionIcon} color="white" />
            Formula Generator
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="form-canggih">
            <ListIcon as={ChatIcon} color="white" />
            Form Canggih
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="form-canggih">
            <ListIcon as={HamburgerIcon} color="white" />
            Tabel 4.0
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="form-canggih">
            <ListIcon as={InfoIcon} color="white" />
            Informasi
          </NavLink>
        </ListItem>
      </List>
    );
  }
}
