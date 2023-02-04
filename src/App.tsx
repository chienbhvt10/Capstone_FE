import { BrowserRouter } from 'react-router-dom';
import Routers from './routers';
interface Props {}

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

export default App;
