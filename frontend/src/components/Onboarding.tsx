interface Props {
  onGetStarted: () => void;
}

export default function Onboarding({ onGetStarted }: Props) {
  return (
    <main className="onboarding-screen">
      <section className="onboarding-art" aria-hidden="true">
        <svg className="onboarding-pattern onboarding-pattern-top" viewBox="0 0 180 120" fill="none">
          <path d="m-20 30 18-18 18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18M-20 52  -2 34l18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18M-20 74-2 56l18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18" stroke="currentColor" strokeWidth="5" />
        </svg>
        <svg className="onboarding-pattern onboarding-pattern-bottom" viewBox="0 0 180 120" fill="none">
          <path d="m-20 30 18-18 18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18M-20 52-2 34l18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18M-20 74-2 56l18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18 18 18 18-18" stroke="currentColor" strokeWidth="5" />
        </svg>
        <span className="onboarding-orbit" />
      </section>
      <section className="onboarding-copy">
        <div>
          <h1>Manage What To Do</h1>
          <p>The best way to manage what you have to do,<br className="onboarding-line-break" /> don’t forget your plans.</p>
        </div>
        <button type="button" onClick={onGetStarted} className="onboarding-start">
          Get Started
        </button>
      </section>
    </main>
  );
}
