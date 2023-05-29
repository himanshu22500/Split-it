import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import NotFoundPage from "./components/NotFound";
import Groups from "./components/Groups";
import DynamicForm from "./components/DynamicForm";
import Layout from "./components/Layout";
import GroupDetails from "./components/GroupDetails";
import Friends from "./components/Friends";
import AddFriend from "./components/AddFriend";
import AddExpense from "./components/AddExpense";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:id" element={<GroupDetails />} />
          <Route path="groups/:id/expense" element={<AddExpense />} />
          <Route path="/groups/new" element={<DynamicForm />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/friends/new" element={<AddFriend />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
