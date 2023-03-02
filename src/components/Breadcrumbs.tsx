import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface Paths {
    title: string;
    path: string;
    icon: JSX.Element;
}

interface IconBreadcrumbsProps {
    paths: Paths[];
    lastPath: Paths;
}

function IconBreadcrumbs(props: IconBreadcrumbsProps) {
  const navigate = useNavigate();

  return (
    <div>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "10px" }}>
            {props.paths.map((path, index) => {
                return (
                    <Link
                        underline="hover"
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            fontSize: '0.8em',
                         }}
                        color="inherit"
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(path.path);
                        }}
                    >
                        {path.icon}
                        {path.title}
                    </Link>
                )
            })}
        <Typography
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '0.8em',
         }}
          color="text.primary"
          onClick={() => {
            navigate(props.lastPath.path);
          }}
        >
            {props.lastPath.icon}
            {props.lastPath.title}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

export { IconBreadcrumbs };