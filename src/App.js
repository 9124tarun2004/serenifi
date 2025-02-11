import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Journal from './components/Journal';
import Music from './components/Music';
import MyPlant from './components/MyPlant';
import Profile from './components/Profile';
import Settings from './components/Settings';
import HomePage from './components/HomePage';
import { PointsProvider } from './context/PointsContext';
import Challenge from './components/Challenge';
import Games from './components/Games';
import Webinar from './components/Webinar';
import Community from './components/Community';
import Layout from './components/Layout';
import Analytics from './components/Analytics';
import Rewards from './components/Rewards';

function App() {
    return (
        <PointsProvider>
            <Router>
              <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/my-plant" element={<MyPlant />} />
                    <Route path="/challenge" element={<Challenge />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/webinar" element={<Webinar />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/rewards" element={<Rewards />} />
                </Routes>
              </Layout>
            </Router>
        </PointsProvider>
    );
}

export default App;
