import React, { useEffect } from "react";
import io from 'socket.io-client';
import {
  Box,
  Button,
  Container, 
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

type RegisterType = {
  id_venta: number;
  contenido: string;
  precio: number;
};

export const App: React.FC<{}> = () => {
  const [registerData, setRegisterData] = React.useState<RegisterType>({
    id_venta: 0,
    contenido: "",
    precio : 0
  });

  const dataRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {
        id_venta,
        contenido,
        precio
      } = registerData;
      console.log(id_venta);
      const response = await axios.post("https://api-multi-principal.onrender.com/ventas", {
        id_venta,
        contenido,
        precio
      });
      if (response) {
        console.log("Registro exitoso");
        setRegisterData({
          id_venta: 0,
          contenido: " ",
          precio: 0,
        });
      } else {
        console.error("Error al registrar");
      }
    } catch (error) { 
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const socket = io("https://websocket-mqxb.onrender.com");
    socket.on("newClient", (message) => { 
      alert("Ciclo concluido" + message);
    });
  }, []);

  return (
    <Container
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: '#f0f0f0', // Changed background color
        minHeight: "100vh"
      }}
    >
      <Container maxWidth="sm"> {/* Reduced container width */}
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Paper sx={{ padding: "1.2em" }}> {/* Removed border radius */}
              <Typography
                variant="h5"
                sx={{ mb: 2 }}
              >
                Ventas
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  name="id_venta"
                  margin="normal"
                  fullWidth
                  label="Id de la venta"
                  sx={{ mb: 1.5 }}
                  required
                  type="number"
                  onChange={dataRegister}
                  value={registerData.id_venta}
                />
                <TextField
                  name="contenido"
                  margin="normal"
                  fullWidth
                  label="Contenido de la venta"
                  sx={{ mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.contenido}
                />
                <TextField
                  name="precio"
                  margin="normal"
                  fullWidth
                  label="Ingrese el precio"
                  sx={{ mb: 1.5 }}
                  required
                  type="number"
                  onChange={dataRegister}
                  value={registerData.precio}
                />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ bgcolor: '#1976d2', color: 'white' }} // Changed button color
                >
                  Enviar
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};
