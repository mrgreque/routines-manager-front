import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { DashCard } from '../../components/DashCard';
import { ILog } from '../../dtos/log';
import { IProject } from '../../dtos/project';
import { connection } from '../../provider/connection';
import { palette } from '../../theme/palette';
import './Home.css';
import CircleIcon from '@mui/icons-material/Circle';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};

function Home() {
  const [logsNow, setLogsNow] = useState<number>(0);
  const [logsWithErrorNow, setLogsWithErrorNow] = useState<number>(0);
  const [logs, setLogs] = useState<ILog[]>([]);

  const [activeProjects, setActiveProjects] = useState<number>(0);
  const [withErrorProjects, setWithErrorProjects] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const date = new Date().toLocaleString().slice(0, 10).split('/');
    console.log(date);

    connection
      .get(`/log/get-all/?date=${date[1]}-${date[0]}-${date[2]}`)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.length);
        setLogsNow(response.data.length);
        setLogsWithErrorNow(
          response.data.filter((log: ILog) => log.error == true).length,
        );
        setLogs(response.data.reverse());
      })
      .catch((error) => {
        alert(error.response.data.message);
      });

    connection
      .get(`/project/get-all?active=true`)
      .then((response) => {
        setActiveProjects(
          response.data.filter((project: IProject) => project.active == true)
            .length,
        );
        setWithErrorProjects(
          response.data.filter((project: IProject) => project.withError == true)
            .length,
        );
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        color: palette.primary.main,
      }}
    >
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            width: '100%',
          }}
        >
          Carregando informações...
        </div>
      ) : (
        <div></div>
      )}

      <section
        style={{
          display: loading ? 'none' : 'block',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <DashCard title="Erros (Dia)">
              <div style={divStyle}>
                <p>{logsWithErrorNow}</p>
              </div>
            </DashCard>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DashCard title="Qntd. de logs (Dia)">
              <div style={divStyle}>
                <p>{logsNow}</p>
              </div>
            </DashCard>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DashCard title="Projetos Ativos">
              <div style={divStyle}>
                <p>{activeProjects}</p>
              </div>
            </DashCard>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DashCard title="Projetos Ativos com Erro">
              <div style={divStyle}>
                <p>{withErrorProjects}</p>
              </div>
            </DashCard>
          </Grid>
        </Grid>
        <br />
        <DashCard title="Logs Recentes">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '0.9em',
            }}
          >
            {logs.map((log, index) => {
              if (index < 6) {
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <p>
                      {log.error ? (
                        <CircleIcon
                          sx={{
                            color: palette.error.main,
                            fontSize: '1em',
                          }}
                        />
                      ) : (
                        <CircleIcon
                          sx={{
                            color: palette.success.main,
                            fontSize: '1em',
                          }}
                        />
                      )}
                      {'  '} {new Date(log.createdAt).toLocaleString()} -{' '}
                      {log.log}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </DashCard>
      </section>
    </Box>
  );
}

export { Home };
