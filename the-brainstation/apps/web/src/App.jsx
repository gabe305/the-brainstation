import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import MainDashboard from "./components/MainDashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
          <MainDashboard />
        </QueryClientProvider>
      </DndProvider>
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

export default App;
