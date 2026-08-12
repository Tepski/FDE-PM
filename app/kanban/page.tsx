import PageHeader from "./components/PageHeader";
import Dashboard from "./components/Dashboard";
import Summary from "./components/Summary";
import Projects from "./components/Projects";

const kanban = () => {
  return (
    <div className="w-full h-full relative flex flex-col">
      <PageHeader />
      <Dashboard />
      <Summary />
      <Projects />
    </div>
  )
};

export default kanban;
