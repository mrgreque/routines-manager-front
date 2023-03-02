import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasePage } from "../../components/BasePage";
import { MenuDrawer } from "../../components/Menu";
import { connection } from "../../provider/connection";
import { Paper } from "@mui/material";

function ListProject() {
  const navigate = useNavigate();
  const [proejcts, setProjects] = useState<any[]>([]);
  useEffect(() => {
    connection
      .get("/project/get-all")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/criacao");
        }}
      >Criar Projeto</button>
      <h1>Listagem de Projetos</h1>
      <MenuDrawer />
      {proejcts.map((project) => {
        return (
          <div key={project._id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            {project?.paths?.resultFolder ? (
              <p>{project.paths.resultFolder}</p>
            ) : null}
            <button
              key={project._id}
              onClick={() => {
                navigate(`/projeto/${project._id}`);
              }}
            >
              Acessar
              teste
            </button>
          </div>
        );
      })}
    </div>
  );
}

export { ListProject };
