import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotels from "./pages/AddHotels";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel";

function App() {
  const {isLoggedIn} = useAppContext()
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
     
          
          <Route path="/add-hotel"
          element={
            <Layout>
              <AddHotels/>
            </Layout>
          }
          />
   
          
       {
        isLoggedIn &&  <Route path="/my-hotels"
          element={
            <Layout>
              <MyHotels/>
            </Layout>
          }
          />
       }
       {
        isLoggedIn &&  <Route path="/edit-hotel/:hotelId"
          element={
            <Layout>
              <EditHotel/>
            </Layout>
          }
          />
       }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
