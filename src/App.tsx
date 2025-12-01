import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { Categories } from "@/pages/Categories";
import { Posts } from "@/pages/Posts";
import { SeriesPage } from "@/pages/Series";
import { Users } from "@/pages/Users";
import { Roles } from "@/pages/Roles";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
      </Routes>
    </Router>
  );
}

export default App;
