import { Link } from 'react-router-dom';

type Screen = {
  name: string;
  path: string;
};

export default function Sidebar({ screens }: { screens: Screen[] }) {
  return (
    <div style={{ padding: '1rem', background: '#eee' }}>
      <h3>Sidebar</h3>
      <ul>
        {screens.map((screen) => (
          <li key={screen.path}>
            <Link to={screen.path}>{screen.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
