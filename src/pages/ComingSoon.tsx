import bestLogo from '@/assets/bestmblogocl.svg';
import soumLogo from '@/assets/soum-logo.png';

const ComingSoon = () => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center">
    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
      <img src={bestLogo} alt="BEST Maribor" className="h-36 w-auto sm:h-64" />
      <img src={soumLogo} alt="ŠOUM" className="h-24 w-auto sm:h-40" />
    </div>
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Pripravlja se</h1>
      <p className="text-base text-slate-500 sm:text-lg">Coming soon</p>
    </div>
  </main>
);

export default ComingSoon;
