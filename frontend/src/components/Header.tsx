interface Props {
  view: 'home' | 'search';
  onOpenSearch: () => void;
  onBack: () => void;
}

export default function Header({ view, onOpenSearch, onBack }: Props) {
  if (view === 'search') {
    return (
      <header className="app-header app-header-search">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to tasks"
          className="icon-button back-button"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14 18-6-6 6-6M8 12h12" />
          </svg>
        </button>
        <h1>Find a task</h1>
      </header>
    );
  }

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">YOUR DAY, ORGANIZED</p>
        <h1>My Tasks</h1>
      </div>
      <button
        type="button"
        onClick={onOpenSearch}
        aria-label="Search tasks"
        className="search-trigger"
      >
        <span>Search for a task</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path strokeLinecap="round" d="m16 16 4 4" />
        </svg>
      </button>
    </header>
  );
}
