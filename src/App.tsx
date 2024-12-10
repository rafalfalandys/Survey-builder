import "./App.module.scss";
import JsonForm from "./Form/JsonForm";
import QuestionsForm from "./Form/QuestionsForm";
import { DSProvider } from "@synerise/ds-core";

const App: React.FC = () => {
  return (
    <DSProvider>
      <QuestionsForm />
      <JsonForm />
    </DSProvider>
  );
};

export default App;
