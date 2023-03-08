import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProject } from '../../dtos/project';
import { connection } from '../../provider/connection';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/system/Box';
import { palette } from '../../theme/palette';
import { Button } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

function ListProject() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<IProject[]>([]);
  useEffect(() => {
    connection
      .get('/project/get-all')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        color: palette.primary.main,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '20px 0',
        }}
      >
        <Button
          variant="contained"
          sx={{
            color: palette.primary.contrastText,
            backgroundColor: palette.primary.main,
            '&:hover': {
              backgroundColor: palette.secondary.light,
            },
          }}
          onClick={() => {
            navigate('/criacao');
          }}
        >
          Criar Projeto
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: palette.secondary.main,
              height: '55px',
            }}
          >
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  color: palette.primary.contrastText,
                }}
              >
                Projeto
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: palette.primary.contrastText,
                }}
              >
                Descrição
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: palette.primary.contrastText,
                }}
              >
                Erro
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: palette.primary.contrastText,
                }}
              >
                Acessar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{project.name}</TableCell>
                <TableCell align="left">{project.description}</TableCell>
                <TableCell align="center">
                  {project.withError ? (
                    <CircleIcon
                      sx={{ color: palette.error.main, fontSize: '1.2em' }}
                    />
                  ) : (
                    <CircleIcon
                      sx={{ color: palette.success.main, fontSize: '1.2em' }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <OpenInNewIcon
                    style={{ width: '20px', cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/projeto/${project._id}`);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export { ListProject };
