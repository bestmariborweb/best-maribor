import bestLogo from '@/assets/bestmblogocl.svg';

const ComingSoon = () => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center">
    <img src={bestLogo} alt="BEST Maribor" className="h-48 w-auto sm:h-64" />
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Pripravlja se</h1>
      <p className="text-base text-slate-500 sm:text-lg">Coming soon</p>
    </div>
  </main>
);

export default ComingSoon;
