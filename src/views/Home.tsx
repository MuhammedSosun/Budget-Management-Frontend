import Header from "../components/Layout/Header/Header";
import Container from "../components/ui/Container/PageContainer";
import "./Home.scss";
import Dashboard from "../components/Layout/Dashboard/Dashboard";

function Home() {
  return (
    <div className="home-page">
      <Container size="large">
        <Header />
        <Dashboard />
      </Container>
    </div>
  );
}

export default Home;
