import React, { useEffect, useState } from 'react';
import { SideBox, DashNav } from '../../Components';
import { Link ,useNavigate } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import MainDashBoard from './MainDashBoard'
import NewProject from './Newproject'
import Savedfile from './Savedfile'
import Stats from './Stats'
import { About, Chatbot } from '../index';
import { useFirebase } from '../../Context/FirebaseContext';

const Dashboard = () => {
    const { user, loading } = useFirebase();
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin');
        }
    }, [loading, user, navigate]);

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-zinc-950 text-white">
                <div className="text-xl font-semibold">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }


    return (
        <>
            <DashNav />
            <SideBox />

            <Routes>
                <Route path='/' element={<MainDashBoard />} />
                <Route path='newproject' element={<NewProject />} />
                <Route path='saved' element={<Savedfile />} />
                <Route path='stats' element={<Stats />} />
                <Route path='help' element={<About />} />
                <Route path='chat' element={<Chatbot />} />
                <Route path='workspace' element={<Savedfile />} />
                <Route path='team' element={<NewProject />} />
                <Route path='solo-options' element={<NewProject />} />
                <Route path='languages' element={<NewProject />} />
            </Routes>

        </>
    );
}

// Dashboard layout with sidebar navigation
export default Dashboard;