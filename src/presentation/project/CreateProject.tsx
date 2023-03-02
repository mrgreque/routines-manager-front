import { useState } from 'react';
import { connection } from '../../provider/connection';

function CreateProject() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const reset = () => {
    setName('');
    setDescription('');
  };

  const save = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    connection
      .post('/project/insert', {
        name,
        description,
      })
      .then((response) => {
        if (response.status === 201) {
          reset();
          alert('Rotina criada com sucesso!');
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div>
      <h1>Criação de Rotina</h1>
      <form>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button onClick={(e) => save(e)}>Criar</button>
      </form>
    </div>
  );
}

export { CreateProject };
