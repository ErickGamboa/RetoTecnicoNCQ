import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';


const useAppData = () => {
  const [data, setTareas] = useState([]);
  const [allData, setAllData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [selectedColaborador, setSelectedColaborador] = useState('');
  const [estado, setEstado] = useState('Pendiente');
  const [prioridad, setPrioridad] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [notas, setNotas] = useState('');
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [tableKey, setTableKey] = useState(0);
  const [id, setId] = useState();
  const [deletedId, setDeletedId] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }
  const handleInsertar = () => {
    const dataTareas = {
      descripcion,
      colaborador: selectedColaborador,
      estado,
      prioridad,
      fecha_inicio: fechaInicio.format('YYYY-MM-DD'),
      fecha_fin: fechaFin.format('YYYY-MM-DD'),
      notas,
      id,
    }
    if (descripcion && estado && prioridad && fechaInicio && fechaFin && notas) {
      if (!(estado === 'En proceso' || estado === 'Finalizada') || selectedColaborador.length !== 0) {
        if (dataTareas.id) {
          axios.put('http://localhost:7186/api/Tareas', dataTareas)
            .then((response) => {
              setMensajeAlerta('Tarea editada correctamente');
              setSeverity('success');
              setTableKey((prevKey) => prevKey + 1);
              console.log('Respuesta del servidor:', response.data);
            })
            .catch((error) => {
              setMensajeAlerta('Error con el servidor');
              setSeverity('error');
              console.error('Error al enviar la solicitud:', error);
            });
          setId(null);
        } else {
          axios.post('http://localhost:7186/api/Tareas', dataTareas)
            .then((response) => {
              setMensajeAlerta('Tarea añadida correctamente');
              setSeverity('success');
              setTableKey((prevKey) => prevKey + 1);
              console.log('Respuesta del servidor:', response.data);
            })
            .catch((error) => {
              setMensajeAlerta('Error con el servidor');
              setSeverity('error');
              console.error('Error al enviar la solicitud:', error);
            });
        }
      } else {
        setMensajeAlerta('No puedes crear una tarea ' + estado + ' sin colaborador');
        setSeverity('error')
      }
    } else {
      setMensajeAlerta('Debes de ingresar información válida');
      setSeverity('error')
    }
  };
  const limpiarVariables = () => {
    setDescripcion('');
    setSelectedColaborador('');
    setEstado('Pendiente');
    setPrioridad('');
    setFechaInicio(null);
    setFechaFin(null);
    setNotas('');
  };
  useEffect(() => {
    axios.get(`http://localhost:7186/api/Tareas?key=${tableKey}`)
      .then(response => {
        setTareas(response.data);
        setAllData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Tareas:', error);
      });
  }, [tableKey]);
  useEffect(() => {
    axios.get(`http://localhost:7186/api/Colaboradores`)
      .then(response => {
        setColaboradores(response.data);
      })
      .catch(error => {
        console.error('Error fetching colaboradores:', error);
      });
  }, []);
  return {
    data,
    setTareas,
    allData,
    setAllData,
    modalInsertar,
    setModalInsertar,
    colaboradores,
    setColaboradores,
    descripcion,
    setDescripcion,
    selectedColaborador,
    setSelectedColaborador,
    estado,
    setEstado,
    prioridad,
    setPrioridad,
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    notas,
    setNotas,
    mensajeAlerta,
    setMensajeAlerta,
    showAlert,
    setShowAlert,
    severity,
    setSeverity,
    tableKey,
    setTableKey,
    id,
    setId,
    deletedId,
    setDeletedId,
    confirmDelete,
    setConfirmDelete,
    handleShowAlert,
    handleCloseAlert,
    abrirCerrarModalInsertar,
    handleInsertar,
    limpiarVariables,
  };
}
function App() {
  const { data,
    setTareas,
    allData,
    modalInsertar,
    colaboradores,
    descripcion,
    setDescripcion,
    selectedColaborador,
    setSelectedColaborador,
    estado,
    setEstado,
    prioridad,
    setPrioridad,
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    notas,
    setNotas,
    mensajeAlerta,
    setMensajeAlerta,
    showAlert,
    severity,
    setSeverity,
    setTableKey,
    setId,
    deletedId,
    setDeletedId,
    confirmDelete,
    setConfirmDelete,
    handleShowAlert,
    handleCloseAlert,
    abrirCerrarModalInsertar,
    handleInsertar,
    limpiarVariables,
  } = useAppData();
  const bodyInsertar = (
    <Box sx={{ position: 'absolute', width: 400, backgroundColor: 'white', padding: 2, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Typography sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} variant="h5" gutterBottom>
        Manejador de tareas
      </Typography>
      <TextField name="descripcion"
        sx={{ width: '100%' }}
        label="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)} />
      <br />
      <FormControl sx={{ width: '100%', marginTop: '16px' }}>
        <InputLabel id="demo-simple-select-label">Colaborador</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedColaborador}
          onChange={(event) => setSelectedColaborador(event.target.value)}
        >
          {colaboradores.map(colaborador => (
            <MenuItem key={colaborador.id} value={colaborador.nombre}>
              {colaborador.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: '100%', marginTop: '16px' }}>
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
        <Select labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={estado}
          onChange={(event) => setEstado(event.target.value)} defaultValue={'Pendiente'}>
          <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
          <MenuItem value={'En proceso'}>En proceso</MenuItem>
          <MenuItem value={'Finalizada'}>Finalizada</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '100%', marginTop: '16px' }}>
        <InputLabel id="demo-simple-select-label">Prioridad</InputLabel>
        <Select labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={prioridad}
          onChange={(event) => setPrioridad(event.target.value)}>
          <MenuItem value={'Alta'}>Alta</MenuItem>
          <MenuItem value={'Media'}>Media</MenuItem>
          <MenuItem value={'Baja'}>Baja</MenuItem>
        </Select>
      </FormControl>
      <br />
      <DatePicker
        sx={{ width: '100%', marginTop: '16px' }}
        label="Fecha de inicio"
        valueType="date"
        value={fechaInicio}
        onChange={(date) => {
          setFechaInicio(date);
        }}
      />
      <br />
      <DatePicker
        sx={{ width: '100%', marginTop: '16px' }}
        label="Fecha de fin"
        value={fechaFin}
        onChange={(date) => {
          setFechaFin(date);
        }}
      />
      <br /><br />
      <TextField name="notas"
        sx={{ width: '100%' }}
        label="Notas"
        value={notas}
        onChange={(e) => setNotas(e.target.value)} />
      <Box sx={{ textAlign: 'right' }}>
        <Button color="primary" onClick={() => {
          handleInsertar();
          handleShowAlert();
          limpiarVariables();
          abrirCerrarModalInsertar();
        }}>Aceptar</Button>
        <Button onClick={() => {
          abrirCerrarModalInsertar();
          limpiarVariables();
        }}>Cancelar</Button>
      </Box>
    </Box>
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Box sx={{ padding: '20px' }}>
        <TopNav
          abrirCerrarModalInsertar={abrirCerrarModalInsertar}
          setTareas={setTareas}
          allData={allData}
          fechaFin={fechaFin}
          fechaInicio={fechaInicio}
        />
        <br /><br />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Colaborador</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Prioridad</TableCell>
                <TableCell>Fecha de inicio</TableCell>
                <TableCell>Fecha de fin</TableCell>
                <TableCell>Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(tarea => (
                <TableRow key={tarea.id}>
                  <TableCell>{tarea.id}</TableCell>
                  <TableCell>{tarea.descripcion}</TableCell>
                  <TableCell>{tarea.colaborador}</TableCell>
                  <TableCell>{tarea.estado}</TableCell>
                  <TableCell>{tarea.prioridad}</TableCell>
                  <TableCell>{tarea.fecha_inicio}</TableCell>
                  <TableCell>{tarea.fecha_fin}</TableCell>
                  <TableCell>
                    <Edit sx={{ cursor: 'pointer', color: "#185FA5" }} onClick={() => {
                      setDescripcion(tarea.descripcion);
                      setSelectedColaborador(tarea.colaborador);
                      setEstado(tarea.estado);
                      setPrioridad(tarea.prioridad);
                      setFechaInicio(dayjs(tarea.fecha_inicio));
                      setFechaFin(dayjs(tarea.fecha_fin));
                      setNotas(tarea.notas);


                      setId(tarea.id)
                      abrirCerrarModalInsertar();
                    }}></Edit>
                    &nbsp;&nbsp;&nbsp;
                    <Delete sx={{ cursor: 'pointer', color: "#A32727" }}
                      onClick={() => {
                        setDeletedId(tarea.id);
                        setConfirmDelete(true);
                      }}
                    ></Delete>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={modalInsertar}
          onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        <Modal
          open={confirmDelete}
        >
          <Box sx={{ position: 'absolute', width: 400, backgroundColor: 'white', padding: 2, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Typography sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} variant="h6" gutterBottom>
              ¿Estás seguro que deseas eliminar la tarea?
            </Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Button color="primary" onClick={() => {

                axios.delete('http://localhost:7186/api/Tareas/', { data: { id: deletedId } })
                  .then((response) => {
                    setMensajeAlerta('Tarea elimindada correctamente');
                    setSeverity('success');
                    setTableKey((prevKey) => prevKey + 1);
                    console.log('Respuesta del servidor:', response.data);
                  })
                  .catch((error) => {
                    setMensajeAlerta('Error con el servidor');
                    setSeverity('error');
                    console.error('Error al enviar la solicitud:', error);
                  });

                setConfirmDelete(false);

                setDeletedId(null);

              }}>Eliminar</Button>
              <Button onClick={() => {
                setConfirmDelete(false);
                setDeletedId(null);
              }}>Cancelar</Button>
            </Box>
          </Box>
        </Modal>
        <Stack
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '25%',
            marginTop: 2,
          }}
          spacing={2}
        >
          <Alert
            open={showAlert}
            onClose={handleCloseAlert}
            severity={severity}
            sx={{ display: showAlert ? 'flex' : 'none' }}
          >
            {mensajeAlerta}
          </Alert>
        </Stack>
      </Box>
    </LocalizationProvider>

  );
}
function TopNav(
  {
    abrirCerrarModalInsertar,
    setTareas,
    allData,
    fechaFin,
    fechaInicio,
  }
) {
  return (
    <Box>
      <Button onClick={() => abrirCerrarModalInsertar()} sx={{ display: 'block', margin: 'auto', marginTop: 2 }}>Insertar</Button>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <TextField sx={{ width: '50%' }} label="Buscar Colaborador"
            onChange={(e) => {
              const newData = allData.filter((tarea) => {
                return tarea.colaborador.toLowerCase().includes(e.target.value.toLowerCase());
              });

              setTareas(newData);
            }} />
          <TextField sx={{ width: '50%' }} label="Buscar Estado"
            onChange={(e) => {
              const newData = allData.filter((tarea) => {
                return tarea.estado.toLowerCase().includes(e.target.value.toLowerCase());
              });
              setTareas(newData);
            }} />
          <TextField sx={{ width: '50%' }} label="Buscar Prioridad"
            onChange={(e) => {
              const newData = allData.filter((tarea) => {
                return tarea.prioridad.toLowerCase().includes(e.target.value.toLowerCase());
              });
              setTareas(newData);
            }} />
        </Box>
        <Box sx={{ textAlign: 'center', display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>

          <DatePicker
            sx={{ width: '100%', marginTop: '16px' }}
            label="Buscar Fecha de inicio"
            value={fechaInicio}
            onChange={(date) => {
              if (!date) {
                return setTareas(allData);
              };
              const newData = allData.filter((tarea) => {
                return dayjs(tarea.fecha_inicio) > dayjs(date);
              });
              setTareas(newData);
            }}
          />
          <DatePicker
            sx={{ width: '100%', marginTop: '16px' }}
            label="Buscar Fecha de fin"
            value={fechaFin}
            onChange={(date) => {
              if (!date) {
                return setTareas(allData);
              };
              const newData = allData.filter((tarea) => {
                return dayjs(tarea.fecha_fin) < dayjs(date);
              });
              setTareas(newData);
            }}
          />
        </Box>


      </Box>

    </Box>
  );
}

export default App;
