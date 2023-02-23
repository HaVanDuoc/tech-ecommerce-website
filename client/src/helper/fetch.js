import axios from "axios";
import React from "react";

// Fetch list user
export const FetchUserList = () => {
  const [list, setList] = React.useState({});

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios("/admin/users");
      setList(response.data.data);
    };

    fetch();
  }, []);

  return list;
};

// Fetch list role
export const FetchRoleList = () => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios("/admin/roles");
      setList(response.data.data);
    };

    fetch();
  }, []);

  return list;
};

// Fetch user
export const FetchUser = (userId) => {
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios(`/admin/user/${userId}`);

      setUser(response.data.data);
    };

    fetch();
  }, [userId]);

  return user;
};

// Fetch gender
export const FetchGender = () => {
  const [gender, setGender] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios("/db/getGender");

      setGender(response.data.data);
    };

    fetch();
  }, []);

  return gender;
};

// Fetch list role
export const FetchListRole = () => {
  const [role, setRole] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios("/db/listRole");

      setRole(response.data.data);
    };

    fetch();
  }, []);

  return role;
};

// Fetch Status Account
export const FetchStatusAccount = () => {
  const [status, setStatus] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios("/db/statusAccount");

      setStatus(response.data.data);
    };

    fetch();
  }, []);

  return status;
};
