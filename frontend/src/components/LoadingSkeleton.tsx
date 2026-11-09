import Layout from './Layout';

const bar = 'animate-pulse rounded bg-slate-200';

export default function LoadingSkeleton() {
  return (
    <Layout>
      <main aria-label="Loading tasks" aria-busy="true" className="animate-pulse">
        <header className="mb-7 flex items-center justify-between gap-5">
          <div className="space-y-2">
            <div className={`${bar} h-3 w-36`} />
            <div className={`${bar} h-8 w-32`} />
          </div>
          <div className={`${bar} h-[50px] w-[min(57%,300px)] rounded-lg`} />
        </header>

        <section aria-hidden="true" className="mb-6 grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, index) => (
            <div key={index} className="flex min-h-[70px] flex-col items-center justify-center gap-2 rounded-lg">
              <div className={`${bar} h-3 w-8`} />
              <div className={`${bar} h-4 w-6`} />
            </div>
          ))}
        </section>

        <section aria-hidden="true" className="mb-7 grid grid-cols-2 gap-4">
          <div className="h-[94px] rounded-[13px] bg-indigo-100 p-4">
            <div className={`${bar} h-4 w-28`} />
            <div className={`${bar} mt-3 h-7 w-20`} />
          </div>
          <div className="h-[94px] rounded-[13px] bg-rose-100 p-4">
            <div className={`${bar} h-4 w-28`} />
            <div className={`${bar} mt-3 h-7 w-20`} />
          </div>
        </section>

        <section aria-hidden="true" className="mb-7 space-y-3">
          <div className="flex justify-between">
            <div className={`${bar} h-5 w-36`} />
            <div className={`${bar} h-4 w-8`} />
          </div>
          <div className="h-3 rounded-sm bg-indigo-100" />
        </section>

        <section aria-hidden="true" className="space-y-4">
          <div className="flex justify-between">
            <div className={`${bar} h-5 w-28`} />
            <div className={`${bar} h-4 w-20`} />
          </div>
          <div className="space-y-4 border-t border-slate-200 pt-4">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex items-center gap-3">
                <div className={`${bar} h-[21px] w-[21px] rounded-sm`} />
                <div className="flex-1 space-y-2">
                  <div className={`${bar} h-4 w-2/5`} />
                  <div className={`${bar} h-3 w-3/5`} />
                </div>
                <div className={`${bar} h-8 w-9 rounded`} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
