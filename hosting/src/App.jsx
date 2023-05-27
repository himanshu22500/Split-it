import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import NotFoundPage from "./components/NotFound";
import Groups from "./components/Groups";
import DynamicForm from "./components/DynamicForm";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/new" element={<DynamicForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
