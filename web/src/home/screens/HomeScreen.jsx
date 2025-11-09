import React from 'react';
import '../css/home.css';

function HomeScreen() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a ZZZ Platform</h1>
        <p>Zero to Zero-Fatigue Zone</p>
      </header>
      <main className="home-main">
        <div className="home-card">
          <h3>Panel Principal</h3>
          <p>Aquí se mostrarán las métricas y el estado del sistema</p>
        </div>
      </main>
    </div>
  );
}

export default HomeScreen;
