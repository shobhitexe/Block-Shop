import { Container } from "react-bootstrap";
import {  BrowserRouter as Router, Route, BrowserRouter} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route  path='/' component={HomeScreen} exact/>
          <Route  path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route  path='/product/:id' component={ProductScreen} />
        </Container>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
