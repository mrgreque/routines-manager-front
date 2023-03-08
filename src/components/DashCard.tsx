import { Card, CardContent, CardHeader, Divider } from '@mui/material';

export interface DashCardProps {
  title: string;
  children: JSX.Element;
}

function DashCard(props: DashCardProps) {
  const { title, children } = props;

  return (
    <Card>
      <CardHeader title={title} titleTypographyProps={{ variant: 'h6' }} />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export { DashCard };
