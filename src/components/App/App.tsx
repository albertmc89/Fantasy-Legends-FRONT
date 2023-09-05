import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <HomePage />
    </div>
  );
};

export default App;
