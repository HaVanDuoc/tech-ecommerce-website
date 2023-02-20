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
