import { Box, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../../../components/Input";
import { connection } from "../../../provider/connection";
import { palette } from "../../../theme/palette";
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ActionButtons } from "../../../components/ActionButtons";
import { IconBreadcrumbs } from "../../../components/Breadcrumbs";
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';

function EditProject() {
  const { id } = useParams<{ id: string }>();

  const [project, setProject] = useState<any>({});
  const [editing, setEditing] = useState<boolean>(false);
  const [expandedPanelOne, setExpandedPanelOne] = useState<boolean>(true);
  const [expandedPanelTwo, setExpandedPanelTwo] = useState<boolean>(true);
  const [defaultName, setDefaultName] = useState<string>("");

  const changeName = (event: any) => {
    setProject({ ...project, name: event.target.value });
  };
  const changeDescription = (event: any) => {
    setProject({ ...project, description: event.target.value });
  };
  const changeActive = (event: any) => {
    setProject({ ...project, active: !project.active });
  };
  const changeResultFolder = (event: any) => {
    setProject({ ...project, paths: { ...project.paths, resultFolder: event.target.value } });
  };
  const changePathFolder = (event: any) => {
    setProject({ ...project, paths: { ...project.paths, pathFolder: event.target.value } });
  };
  const changeStartFolder = (event: any) => {
    setProject({ ...project, paths: { ...project.paths, start: event.target.value } });
  };
  const changeEndFolder = (event: any) => {
    setProject({ ...project, paths: { ...project.paths, stop: event.target.value } });
  };

  const saveProject = () => {
    let cloneProject = { ...project };
    delete cloneProject._id;

    connection
      .put(`/project/update/`, {
        id: project._id,
        update: cloneProject,
        nameHasUpdated: defaultName !== project.name
      })
      .then((response) => {
        alert(response.data.message);
        setEditing(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    connection
      .get(`/project/get/${id}`)
      .then((response) => {
        setProject(response.data);
        setDefaultName(response.data.name);
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
          lastPath={{ title: "Geral", path: "", icon: <SettingsIcon sx={{width:"20px"}}/>}}
        />
      {/* Título */}
      <section
        style={{
          width: "100%",
          backgroundColor: palette.secondary.main,
          paddingLeft: "10px",
          color: palette.secondary.contrastText,
        }}
      >
        <h2>Geral</h2>
      </section>

      <Divider />

      <br />

      <section 
        style={{
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Edit Name */}
          <div 
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 2,
          }}>
            <label style={{ fontSize: "0.9em", }}>Nome</label>
            <Input 
              type="text" 
              placeholder="Nome" 
              value={project.name} 
              onChange={changeName} 
              width="95%" 
              disabled={!editing} 
            />
          </div>

          {/* Edit Active */}
          <div 
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "30px",
              fontSize: "0.9em",
              alignItems: "center",
            }}
          >
            <label>Ativo</label>
            <input
              type="checkbox"
              id="active"
              name="active"
              defaultChecked={project.active}
              style={{ 
                width: "20px", 
                height: "20px"
              }}
              onClick={changeActive}
              disabled={!editing} 
            />
          </div>

          {/* Edit With Error */}
          <div 
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "30px",
              fontSize: "0.9em",
              alignItems: "center",
            }}
          >
            <label htmlFor="withError">Com Erro</label>
            <input
              type="checkbox"
              id="withError"
              name="withError"
              defaultChecked={project.withError}
              style={{ 
                width: "20px", 
                height: "20px"
              }}
              disabled
            />
          </div>
        </div>
      </section>

      <section>
        {/* Edit Description */}
        <div
        style={{
          marginBottom: "30px",
        }}
      >
          <label htmlFor="description">Descrição</label>
          <Input 
            type="textarea" 
            placeholder="Descrição" 
            value={project.description} 
            onChange={changeDescription} 
            width="100%"
            disabled={!editing} 
          />
        </div>
      </section>

      <section>
        {/* Edit pathFolder and resultFolder */}
        <Accordion expanded={expandedPanelOne}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              '&.Mui-expanded': { 
                borderBottom: '1px solid rgba(0, 0, 0, .125)',
              }
            }}
            onClick={() => setExpandedPanelOne(!expandedPanelOne)}
          >
            <Typography>Caminhos</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              padding: "20px 30px",
            }}
          >
            <Box>
              <div style={{ marginBottom: "10px" }}>
                <label>Caminho local do projeto</label>
                <Input 
                  type="text" 
                  placeholder="" 
                  value={project?.paths?.pathFolder || ""} 
                  onChange={changePathFolder} 
                  width="100%" 
                  disabled={!editing} 
                />
              </div>
              <div>
              <label>Caminho local dos resultados projeto</label>
                <Input 
                  type="text" 
                  placeholder="" 
                  value={project?.paths?.resultFolder || ""} 
                  onChange={changeResultFolder} 
                  width="100%" 
                  disabled={!editing} 
                />
              </div>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Edit start and stop */}
        <Accordion expanded={expandedPanelTwo}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              '&.Mui-expanded': { 
                borderBottom: '1px solid rgba(0, 0, 0, .125)',
              }
            }}
            onClick={() => setExpandedPanelTwo(!expandedPanelTwo)}
          >
            <Typography>Rotas (Start/Stop)</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "20px 30px",
            }}
          >
            <Box>
              <div style={{ marginBottom: "10px" }}>
                <label>Rota para start da rotina</label>
                <Input 
                  type="text" 
                  placeholder="" 
                  value={project?.paths?.start || ""} 
                  onChange={changeStartFolder} 
                  width="100%" 
                  disabled={!editing} 
                />
              </div>
              <div>
              <label>Rota para estop do arquivo</label>
                <Input 
                  type="text" 
                  placeholder="" 
                  value={project?.paths?.stop || ""} 
                  onChange={changeEndFolder} 
                  width="100%" 
                  disabled={!editing} 
                />
              </div>
            </Box>
          </AccordionDetails>
        </Accordion>
      </section>

      {/* Action Buttons */}
      <section>
        <ActionButtons
          onClickCancel={() => setEditing(false)}
          onClickEdit={() => setEditing(true)}
          onClickSave={saveProject}
          editing={editing}
        />
      </section>
    </Box>
  );
}

export { EditProject };
