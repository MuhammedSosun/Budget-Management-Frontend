import Container from "../components/ui/Container/PageContainer";
import Profile from "./Profile/Profile";

function GeneralPage() {
  return (
    <Container size="large">
      <div>
        <Profile />
      </div>
    </Container>
  );
}

export default GeneralPage;
