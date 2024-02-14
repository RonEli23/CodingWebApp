import {Link} from 'react-router-dom';

import "../styles/LobbyPage.css";

const LobbyPage = () => {
  const codeBlocks = [
    { id: 1, title: "Async Case" },
    { id: 2, title: "Promise Example" },
    { id: 3, title: "Event Listener Example" },
    { id: 4, title: "Callback Function" },
  ];
  return (
    <section>
      <h1 className='lobby-page-title'>Choose code block</h1>
      <ul className='list-container'>
        {codeBlocks.map((block) => (
          <li key={block.id} className='list-item'>
            <Link to={`/codeblock`}>{block.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LobbyPage;
