import { createContext, useState } from 'react';
import axios from 'axios';
import {FetchUsers, Add, FindOne, Update, Search, Delete} from "../http/users/Users_API";
import { useDisclosure, useToast } from '@chakra-ui/react';
export const GlobalContext = createContext();

export default function Wrapper({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const fetchUsers = async () => {
      try {
          const res = await FetchUsers()
          setUsers(res);
      } catch (error) {
          console.log(error.reponse.data);
      }
  };

  const search = async (query) => {
      try {
          const res = await Search(query);
          setUsers(res);
      } catch (error) {
          console.log(error.reponse.data);
      }
  };

  const deletee = async (id) => {
    try {
        const res = await Delete(id);
        setUsers(users.filter((u) => u._id != id));
        toast({
            title: 'User Deleted',
            status: 'success',
            duration: 4000,
            isClosable: true,
        });
    } catch(error) {
        console.log(error.reponse.data);
    }
  };

  const add = async (form, setForm) => {
    try {
        const res = await Add(form, setForm);
        console.log(res);
        setUsers([...users, res]);
        toast({
            title: 'User Added',
            status: 'success',
            duration: 4000,
            isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
    } catch(error) {
        setErrors(error.response.data.error);
    }

  };

  const findOne = async (id) => {
    try {
        const res = await FindOne(id);
        setUser(res);
    } catch (error) {
        setErrors(error.response.data.error);
    }

  };

  const update = async (form, setForm, id) => {
    try {
        const res = await Update(form, setForm, id)
        toast({
            title: 'User Updated',
            status: 'success',
            duration: 4000,
            isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
        fetchUsers();
    } catch (error) {
        setErrors(error.response.data.error);
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        fetchUsers,
        search,
        deletee,
        add,
        findOne,
        update,
        users,
        onOpen,
        isOpen,
        onClose,
        errors,
        setErrors,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
