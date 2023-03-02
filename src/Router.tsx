import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BasePage } from './components/BasePage';
import { Home } from './presentation/home/Home';
import { Log } from './presentation/project/components/Log';
import { CreateProject } from './presentation/project/CreateProject';
import { EditProject } from './presentation/project/components/EditProject';
import { ListProject } from './presentation/project/ListProject';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BasePage title="" inProject={false}>
              <Home />
            </BasePage>
          }
        />
        <Route
          path="/criacao"
          element={
            <BasePage title="" inProject={false}>
              <CreateProject />
            </BasePage>
          }
        />
        <Route
          path="/projetos"
          element={
            <BasePage title="" inProject={false}>
              <ListProject />
            </BasePage>
          }
        />
        <Route
          path="/projeto/:id"
          element={
            <BasePage title="Dados do Projeto" inProject={true}>
              <EditProject />
            </BasePage>
          }
        />
        <Route
          path="/projeto/:id/logs"
          element={
            <BasePage title="Dados do Projeto" inProject={true}>
              <Log />
            </BasePage>
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export { Router };
