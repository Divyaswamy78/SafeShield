import "./Home.css"
function Home() {
  return (
    <div className="home">
      <section className="features">
  <h2>Why Choose SafeShield?</h2>

  <p className="features-subtitle">
    Build confidence and stay prepared with practical safety education.
  </p>

  <div className="feature-cards">

    <div className="feature-card">
      <div className="feature-icon">🥋</div>
      <h3>Learn Self Defence</h3>
      <p>
        Learn practical self-defence techniques through easy-to-follow
        lessons and demonstrations.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">🛡️</div>
      <h3>Safety Awareness</h3>
      <p>
        Improve your awareness and learn how to respond safely in
        different situations.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">🚨</div>
      <h3>Emergency Guidance</h3>
      <p>
        Access important emergency information and safety guidance
        whenever you need it.
      </p>
    </div>

  </div>
</section>
    </div>
  )
}

export default Home