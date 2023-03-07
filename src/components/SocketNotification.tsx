import { Card, CardHeader, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ReportIcon from '@mui/icons-material/Report';
import { palette } from '../theme/palette';

interface INotification {
  project: string;
  log: string;
  url: string;
}

function SocketNotification() {
  const [notification, setNotification] = useState<INotification | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const socketIo = io('http://localhost:3333');
    console.log(socketIo);
    setSocket(socketIo);
    console.log(socket);
    try {
      socketIo.on('notification', (notification: INotification) => {
        setVisible(true);
        setNotification(notification);
        setTimeout(() => {
          setVisible(false);
        }, 10000);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Card
      sx={{
        display: visible ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'absolute',
        top: '100px',
        right: '10px',
        minWidth: '300px',
        maxWidth: '25%',
        bgcolor: 'white',
        zIndex: 100,
      }}
    >
      <CardHeader
        title="Alerta!"
        icon={<ReportIcon />}
        sx={{
          bgcolor: palette.error.main,
          color: palette.error.contrastText,
          width: '100%',
        }}
      />
      <section
        style={{
          padding: '10px',
        }}
      >
        <p>
          <strong>{notification?.project}</strong>
        </p>
        <div
          style={{
            backgroundColor: '#f3f3f3',
            border: '1px solid #ccc',
            width: '100%',
            padding: '10px',
            fontSize: '0.8em',
          }}
        >
          {notification?.log}
        </div>
        <Link
          href={notification?.url}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            bgcolor: palette.error.light,
            color: palette.error.contrastText,
            padding: '10px',
            marginTop: '10px',
            borderRadius: '5px',
            textDecoration: 'none',
            transition: 'all 0.3s',
            '&:hover': {
              bgcolor: palette.error.dark,
            },
          }}
        >
          Acesse
        </Link>
      </section>
    </Card>
  );
}

export { SocketNotification };
