import {Link} from 'react-router-dom';
import "../styles/LobbyPage.css";

const LobbyPage = () => {
  const codeBlocks = [
    { id: 1, title: "BasicFunction", content: "Basic Function and Variable Declaration" },
    { id: 2, title: "AsyncCode", content: "Asynchronous Function" },
    { id: 3, title: "JSONCode", content: "Working with JSON Data" },
    { id: 4, title: "ArrayManipulation", content: "Array Manipulation" },
  ];

  
  return (
    <section>
      <h1 className='lobby-page-title'>Choose code block</h1>
      <ul className='list-container'>
        {codeBlocks.map((block) => (
          <li key={block.id} className='list-item'>
            <Link to={`/${block.title}`}>{block.content}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LobbyPage;
