"use client";
import { CircularProgress, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState<any[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(1);
  const [userLoading, setUserLoading] = useState<Boolean>(false);
  const [dataLoading, setDataLoading] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  const handleCardClick = (userId: number) => {
    setSelectedUserId(userId);
  };

  async function getAllUsers() {
    setLoading(true);
    const { data } = await axios.get(`/api/get-all-users`);
    const finalData = await data.data;

    if (finalData) {
      setUsers(finalData.reverse());
    }
    setLoading(false);
  }

  async function getUserById(id: number | null) {
    setLoading(true);
    setSelectedUser(null);
    let validId;
    if (id) {
      validId = id;
    } else {
      validId = selectedUserId;
    }
    const { data } = await axios.get(`/api/get-user-id?id=${validId}`);
    const finalData = await data.data;
    if (finalData) {
      setSelectedUser(finalData);
    }
    setLoading(false);
  }

  function handleUserClick(id: number) {
    setLoading(true);
    handleCardClick(id);
    getUserById(id);
    setLoading(false);
  }

  useEffect(() => {
    getAllUsers();
    getUserById(null);
  }, []);

  // if (!selectedUser) {
  //   setSelectedUser(users[0]);
  // }

  console.log(selectedUserId);

  return (
    <main>
      <CssBaseline />
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Box width="30%" padding="8px">
            <Box
              bgcolor="#C5DFFF"
              height="60px"
              borderRadius="8px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography fontSize="20px">USERS LIST</Typography>
            </Box>
            <Box height="450px" overflow="auto">
              {users && !loading ? (
                users?.map((user: any) => (
                  <Box key={user.name} marginY="8px">
                    <Box
                      bgcolor={
                        selectedUserId === user.id ? "#D4D4D4" : "#ECECEC"
                      }
                      p="8px"
                      height="56px"
                      borderRadius="4px"
                      display="flex"
                      alignItems="center"
                      onClick={() => handleUserClick(user.id)}
                      gap="8px"
                    >
                      <Box
                        component="img"
                        height="100%"
                        width="auto"
                        borderRadius="999px"
                        alt={user.profile.username}
                        src={user.avatar ? user.avatar : "/no.jpg"}
                      />
                      <Typography variant="body1" fontSize="20px">
                        {user.profile.firstName} {user.profile.lastName}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box
                  bgcolor={"#ECECEC"}
                  marginTop="8px"
                  height="100%"
                  borderRadius="8px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="8px"
                >
                  <CircularProgress color="primary" />
                </Box>
              )}
            </Box>
          </Box>
          <Box width="70%" padding="8px">
            <Box
              bgcolor="#C5DFFF"
              height="60px"
              borderRadius="8px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography fontSize="20px">USERS LIST</Typography>
            </Box>
            <Box height="450px" overflow="auto" paddingTop="8px">
              {selectedUser && !loading ? (
                <Box
                  display="flex"
                  bgcolor="#ECECEC"
                  justifyContent="center"
                  height="100%"
                  borderRadius="8px"
                  paddingTop="12px"
                >
                  {selectedUser && (
                    <Container sx={{ display: "flex" }}>
                      <Box
                        width="70%"
                        height="100%"
                        padding="12px"
                        display="flex"
                        flexDirection="column"
                        gap="16px"
                      >
                        <Box width="100%">
                          <Typography variant="body1">Full Name:</Typography>
                          <Typography variant="h4" fontWeight="600">
                            {selectedUser[0].profile.firstName}{" "}
                            {selectedUser[0].profile.lastName}
                          </Typography>
                        </Box>
                        <Box width="100%">
                          <Typography variant="body1">Job Title:</Typography>
                          <Typography variant="h5" fontWeight="600">
                            {selectedUser[0].jobTitle}
                          </Typography>
                        </Box>
                        <Box width="100%">
                          <Typography variant="body1">Email:</Typography>
                          <Typography variant="h5" fontWeight="600">
                            {selectedUser[0].profile.email}
                          </Typography>
                        </Box>
                        <Box width="100%">
                          <Typography variant="body1">Bio:</Typography>
                          <Typography variant="h5" fontWeight="600">
                            {selectedUser[0].Bio}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        width="30%"
                        height="60%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        gap="12px"
                      >
                        <Box
                          component="img"
                          height="180px"
                          width="auto"
                          borderRadius="999px"
                          alt={selectedUser[0].profile.username}
                          src={selectedUser[0].avatar}
                        />
                        <Typography
                          variant="h5"
                          textAlign="center"
                          fontWeight="600"
                        >
                          @{selectedUser[0].profile.username}
                        </Typography>
                      </Box>
                    </Container>
                  )}
                </Box>
              ) : (
                <Box
                  display="flex"
                  bgcolor="#ECECEC"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  borderRadius="8px"
                  paddingTop="8px"
                >
                  <CircularProgress color="primary" />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default Home;
