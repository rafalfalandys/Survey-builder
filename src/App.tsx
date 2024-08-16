import "./App.module.scss";
import QuestionsForm from "./Form/QuestionsForm";
import { DSProvider } from "@synerise/ds-core";

const App: React.FC = () => {
  return (
    <DSProvider>
      <QuestionsForm />
    </DSProvider>
  );
};

export default App;
