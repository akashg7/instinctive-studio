import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store';
import { AppLayout } from './components/layout/AppLayout';
import { StudentsPage } from './pages/StudentsPage';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppLayout>
          <StudentsPage />
        </AppLayout>
      </Router>
    </Provider>
  );
}