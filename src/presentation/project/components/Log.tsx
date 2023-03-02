import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connection } from "../../../provider/connection";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';
import { palette } from "../../../theme/palette";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, TableFooter, TablePagination, useTheme } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { IconBreadcrumbs } from "../../../components/Breadcrumbs";
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


function Log() {
  const { id } = useParams<{ id: string }>();
  const [logs, setLogs] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - logs.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    connection
      .get(`/log/get/${id}`)
      .then((response) => {
        setLogs(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

    return (
      <Box 
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "30px",
          color: palette.primary.main,
        }}
      >
        <IconBreadcrumbs 
            paths={[
              { title: "Home", path: "/", icon: <HomeIcon sx={{width:"20px"}}/> },
              { title: "Projetos", path: "/projetos", icon: <AccountTreeIcon sx={{width:"20px"}}/> },
            ]} 
          lastPath={{ title: "Logs", path: "", icon: <AssessmentIcon sx={{width:"20px"}}/>}}
        />
        <section
          style={{
            width: "100%",
            backgroundColor: palette.secondary.main,
            paddingLeft: "10px",
            color: palette.secondary.contrastText,
          }}
        >
          <h2>Logs</h2>
        </section>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="Logs">
            <TableHead>
              <TableRow>
                <TableCell width={50} align="center">Sucesso</TableCell>
                <TableCell align="left">Mensagem</TableCell>
                <TableCell width={50} align="center">Data</TableCell>
                <TableCell width={50} align="center">Hora</TableCell>
                <TableCell width={50} align="center">Expandir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : logs
              ).map((log) => (
                <TableRow
                  key={log.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {log.error ? (
                      <CircleIcon style={{ color: palette.error.main, width: "20px" }} />
                    ) : (
                      <CircleIcon style={{ color: palette.success.main, width: "20px" }} />
                    )}
                  </TableCell>
                  <TableCell align="left">{log.log}</TableCell>
                  <TableCell align="center">{new Date(log.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">{new Date(log.createdAt).toLocaleTimeString()}</TableCell>
                  <TableCell align="center"><OpenInNewIcon style={{ width: "20px" }}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={logs.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    )
}

export { Log };