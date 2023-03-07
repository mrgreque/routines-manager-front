import { useState } from 'react';
import { connection } from '../../provider/connection';
import { palette } from '../../theme/palette';
import { Box, Divider } from '@mui/material';
import { Input } from '../../components/Input';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [pathFolder, setPathFolder] = useState<string>('');
  const [resultFolder, setResultFolder] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [stop, setStop] = useState<string>('');

  const reset = () => {
    setName('');
    setDescription('');
    setPathFolder('');
    setResultFolder('');
    setStart('');
    setStop('');
  };

  const save = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (name === '' || description === '') {
      alert('Preencha todos os campos!');
      return;
    }

    const path = {
      pathFolder: pathFolder !== '' ? pathFolder : null,
      resultFolder: resultFolder !== '' ? resultFolder : null,
      start: start !== '' ? start : null,
      stop: stop !== '' ? stop : null,
    };

    let input;

    if (
      path.pathFolder === null &&
      path.resultFolder === null &&
      path.start === null &&
      path.stop === null
    ) {
      input = {
        name,
        description,
      };
    } else {
      input = {
        name,
        description,
        paths: path,
      };
    }

    console.log(input);

    connection
      .post('/project/insert', input)
      .then((response) => {
        if (response.status === 201) {
          reset();
          alert('Rotina criada com sucesso!');
          navigate('/projetos');
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        color: palette.primary.main,
      }}
    >
      {/* Título */}
      <section
        style={{
          width: '100%',
          backgroundColor: palette.secondary.main,
          paddingLeft: '10px',
          color: palette.secondary.contrastText,
        }}
      >
        <h2>Criação de Rotina</h2>
      </section>

      <Divider />

      <br />

      <section>
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <label htmlFor="name">Nome</label>
          <Input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            width="100%"
            value={name}
          />
        </div>
        <div
          style={{
            marginBottom: '30px',
          }}
        >
          <label htmlFor="description">Descrição</label>
          <Input
            type="text"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
            width="100%"
            value={description}
          />
        </div>

        <h3>Paths:</h3>
        <section
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              marginBottom: '30px',
              width: '48%',
            }}
          >
            <label htmlFor="pathFolder">Diretório do Projeto</label>
            <Input
              type="text"
              placeholder="/"
              onChange={(e) => setPathFolder(e.target.value)}
              width="100%"
              value={pathFolder}
            />
          </div>
          <div
            style={{
              marginBottom: '30px',
              width: '48%',
            }}
          >
            <label htmlFor="resultFolder">Diretório de Resultados</label>
            <Input
              type="text"
              placeholder="/"
              onChange={(e) => setResultFolder(e.target.value)}
              width="100%"
              value={resultFolder}
            />
          </div>
        </section>

        <section
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              marginBottom: '30px',
              width: '48%',
            }}
          >
            <label htmlFor="start">Rota de Start</label>
            <Input
              type="text"
              placeholder="/"
              onChange={(e) => setStart(e.target.value)}
              width="100%"
              value={start}
            />
          </div>
          <div
            style={{
              marginBottom: '30px',
              width: '48%',
            }}
          >
            <label htmlFor="stop">Rota de Stop</label>
            <Input
              type="text"
              placeholder="/"
              onChange={(e) => setStop(e.target.value)}
              width="100%"
              value={stop}
            />
          </div>
        </section>
      </section>

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
          onClick={save}
        >
          Criar Projeto
        </Button>
      </div>
    </Box>
  );
}

export { CreateProject };
