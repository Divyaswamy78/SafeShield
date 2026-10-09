import "./SafetyTips.css"

function SafetyTips() {
  return (
    <div className="safety-page">

      <section className="safety-header">
        <p className="safety-tag">🛡️ STAY ALERT • STAY SAFE</p>

        <h1>Safety Tips</h1>

        <p>
          Simple habits and awareness can help you stay prepared
          in everyday situations.
        </p>
      </section>

      <section className="safety-cards">

        <div className="safety-card">
          <div className="safety-icon">👀</div>
          <h2>Stay Aware</h2>
          <p>
            Pay attention to your surroundings, especially when
            walking alone or travelling in unfamiliar places.
          </p>
        </div>

        <div className="safety-card">
          <div className="safety-icon">📱</div>
          <h2>Keep Your Phone Ready</h2>
          <p>
            Keep your phone accessible and charged when travelling
            so you can contact someone when needed.
          </p>
        </div>

        <div className="safety-card">
          <div className="safety-icon">🚶</div>
          <h2>Travel Safely</h2>
          <p>
            Prefer well-lit and populated routes and let someone
            you trust know about your travel plans when appropriate.
          </p>
        </div>

        <div className="safety-card">
          <div className="safety-icon">🔐</div>
          <h2>Protect Personal Information</h2>
          <p>
            Avoid sharing sensitive personal information with
            unknown people online or offline.
          </p>
        </div>

      </section>

    </div>
  )
}

export default SafetyTips