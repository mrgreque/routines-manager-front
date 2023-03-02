import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BasePage } from "./components/BasePage";
import { Home } from "./presentation/home/Home";
import { Log } from "./presentation/project/components/Log";
import { CreateProject } from "./presentation/project/CreateProject";
import { EditProject } from "./presentation/project/components/EditProject";
import { ListProject } from "./presentation/project/ListProject";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasePage title="" inProject={false} children={<Home />} />} />
        <Route path="/criacao" element={<BasePage title="" inProject={false} children={<CreateProject/>} />} />
        <Route path="/projetos" element={<BasePage title="" inProject={false} children={<ListProject/>} />} />
        <Route path="/projeto/:id" element={<BasePage title="Dados do Projeto" inProject={true}  children={<EditProject/>} />} />
        <Route path="/projeto/:id/logs" element={<BasePage title="Dados do Projeto" inProject={true} children={<Log />} />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export { Router };
