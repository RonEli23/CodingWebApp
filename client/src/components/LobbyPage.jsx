import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

const LobbyPage = () => {
  const codeBlocks = [
    { id: 1, title: "Async Case" },
    { id: 2, title: "Promise Example" },
    { id: 3, title: "Event Listener Example" },
    { id: 4, title: "Callback Function" },
  ];
  return (
    <section>
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map((block) => (
          <li key={block.id}>
            <Link to={`/codeblock`}>{block.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LobbyPage;
