import { useParams } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import "./DashboardPage.css";

const DashboardPage = () => {
  const { id: datasetId } = useParams();

  return (
    <main className="dashboard-page-shell">
      <section className="dashboard-page-hero">
        <div className="dashboard-page-badge">Sensor Dashboard</div>
        <h1>{datasetId} Dashboard</h1>
        <p>
          Explore time-series data, stream behaviour, correlations and summary
          insights in one structured view.
        </p>
      </section>

      <Dashboard datasetId={datasetId} />
    </main>
  );
};

export default DashboardPage;
