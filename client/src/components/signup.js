import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/react-hooks";

//materialUI
import { TextField, Box, Button, Container, Stack, Alert } from "@mui/material";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      username
      token
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    console.log("Callback hit");
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/Profile");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  return (
   <Box pt={4} pb={4}> 
    <Container spacing={2} maxWidth="sm" pt={3} style={{fontSize:20}}>
      <h3>Register</h3>
      <p>Sign up for an account below!</p>
      <Stack spacing={2} paddingBottom={2} pt={3}>
        <TextField label="username" name="username" onChange={onChange} />
        <TextField label="email" name="email" onChange={onChange} />
        <TextField label="password" name="password" onChange={onChange} />
      </Stack>
      {errors.map(function (error) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
      <Button variant="contained" onClick={onSubmit}>
        {" "}
        Sign Up
      </Button>
    </Container>
  </Box>  
  );
}

export default Register;
