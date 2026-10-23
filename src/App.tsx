import { StoreProvider, useStore } from "./store";
import { Header, Footer } from "./components/Shell";
import { Home, VillageInfo, Services, Schemes, Emergency, Notices, LandRecords } from "./components/PublicPages";
import { ComplaintPage, TrackPage, LoginPage, RegisterPage, AccountPage } from "./components/AuthPages";
import { AdminPage } from "./components/AdminPages";
import { useEffect } from "react";

function AppInner() {
  const { route } = useStore();

  useEffect(() => { document.title = titleFor(route.page); }, [route]);

  const render = () => {
    switch (route.page) {
      case "home": return <Home />;
      case "village": return <VillageInfo />;
      case "services": return <Services />;
      case "schemes": return <Schemes />;
      case "complaint": return <ComplaintPage />;
      case "track": return <TrackPage />;
      case "notices": return <Notices />;
      case "emergency": return <Emergency />;
      case "land": return <LandRecords />;
      case "login": return <LoginPage />;
      case "register": return <RegisterPage />;
      case "account": return <AccountPage />;
      case "admin": return <AdminPage />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">{render()}</main>
      <Footer />
    </div>
  );
}

function titleFor(page: string) {
  const map: Record<string, string> = {
    home: "Parkhand Dumariya – Smart Block Portal | Dumaria Prakhand, Gaya, Bihar",
    village: "Block & Village Information | Parkhand Dumariya",
    services: "Digital Services | Parkhand Dumariya",
    schemes: "Government Schemes | Parkhand Dumariya",
    land: "Land Records (Bihar Bhulekh) | Parkhand Dumariya",
    complaint: "Register Complaint | Parkhand Dumariya",
    track: "Track Status | Parkhand Dumariya",
    notices: "Notices | Parkhand Dumariya",
    emergency: "Emergency Contacts | Parkhand Dumariya",
    login: "Login | Parkhand Dumariya",
    register: "Register | Parkhand Dumariya",
    account: "My Account | Parkhand Dumariya",
    admin: "Admin Dashboard | Parkhand Dumariya",
  };
  return map[page] || map.home;
}

export default function App() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  );
}
