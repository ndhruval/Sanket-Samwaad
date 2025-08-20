import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import PublicLayout from './layouts/PublicLayout';
import TextToSignPage from './pages/TextToSignPage'; 
import SpeechToSignPage from './pages/SpeechToSignPage';
import LearningHubPage from './pages/LearningHubPage';
import VideoDetailPage from './pages/VideoDetailPage';
import NotesPage from './pages/NotesPage'; 
import QuizPage from './pages/QuizPage'; 
import ProfilePage from './pages/ProfilePage';
import Layout from './components/Layout';
import theme from './theme';
import ErrorBoundary from './components/ErrorBoundary';

// --- Simple Placeholder Pages ---




// ---------------------------------

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<LoginPage />} />
            </Route>

            {/* Authenticated Routes */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/learn" element={<LearningHubPage />} />
              <Route path="/learn/:videoId" element={<VideoDetailPage />} />         
              <Route path="/tools/text-to-sign" element={<TextToSignPage />} />
              <Route path="/tools/speech-to-sign" element={<SpeechToSignPage />} />
              <Route path="/quizzes" element={<QuizPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;