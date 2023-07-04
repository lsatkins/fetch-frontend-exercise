import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import BaseLayout from './components/layout/BaseLayout'
import LoginPage from './components/LoginPage'
import SearchPage from './components/SearchPage'
import Saved from './components/Saved'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path='/search' element={<SearchPage />}/>
          <Route path='/saved' element={<Saved />}/>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BaseLayout>
    </Router>
  </Provider>,
);

