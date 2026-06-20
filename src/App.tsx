import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Duel from './pages/Duel';
import Result from './pages/Result';
import Library from './pages/Library';
import Upload from './pages/Upload';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import Challenge from './pages/Challenge';
import Aufsatz from './pages/Aufsatz';
import Repetitor from './pages/Repetitor';
import Woerterbuch from './pages/Woerterbuch';
import MockPruefung from './pages/MockPruefung';
import Achievements from './pages/Achievements';
import Lektuere from './pages/Lektuere';
import LektuereTopic from './pages/LektuereTopic';
import { MediationList, MediationDetail } from './pages/Mediation';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/learn/:moduleId" element={<Learn />} />
        <Route path="/learn/:moduleId/:topicId" element={<Learn />} />
        <Route path="/duel/:moduleId" element={<Duel />} />
        <Route path="/result" element={<Result />} />
        <Route path="/library" element={<Library />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/aufsatz" element={<Aufsatz />} />
        <Route path="/repetitor" element={<Repetitor />} />
        <Route path="/woerterbuch" element={<Woerterbuch />} />
        <Route path="/mock-pruefung" element={<MockPruefung />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/lektuere" element={<Lektuere />} />
        <Route path="/lektuere/:authorId" element={<LektuereTopic />} />
        <Route path="/mediation" element={<MediationList />} />
        <Route path="/mediation/:textId" element={<MediationDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
