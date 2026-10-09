import "./Emergency.css"

function Emergency() {
  return (
    <div className="emergency-page">

      <section className="emergency-header">
        <p className="emergency-tag">🚨 EMERGENCY SUPPORT</p>

        <h1>Emergency Help</h1>

        <p>
          Keep important emergency information accessible when
          you need help quickly.
        </p>
      </section>

      <section className="emergency-content">

        <div className="emergency-alert">
          <div className="alert-icon">🚨</div>

          <div>
            <h2>In an Emergency</h2>
            <p>
              Move to a safe location if possible and contact
              appropriate emergency services or someone you trust.
            </p>
          </div>
        </div>

        <div className="emergency-cards">

          <div className="emergency-card">
            <div className="emergency-icon">📞</div>
            <h2>Emergency Services</h2>
            <p>
              Contact your local emergency services when immediate
              assistance is required.
            </p>
            <button>Emergency Call</button>
          </div>

          <div className="emergency-card">
            <div className="emergency-icon">👨‍👩‍👧</div>
            <h2>Trusted Contact</h2>
            <p>
              Keep a trusted family member or friend informed when
              you feel unsafe.
            </p>
            <button>Contact Trusted Person</button>
          </div>

          <div className="emergency-card">
            <div className="emergency-icon">📍</div>
            <h2>Share Your Location</h2>
            <p>
              If appropriate, share your current location with
              someone you trust.
            </p>
            <button>Share Location</button>
          </div>

        </div>

      </section>

    </div>
  )
}

export default Emergency