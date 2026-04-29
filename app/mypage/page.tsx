export default function MyPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Page</h1>
      <div className="bg-card border rounded-xl p-6 mb-5">
        <p>Please <a href="/login" className="text-[var(--gold)] underline">sign in</a> to view your account.</p>
      </div>
    </div>
  );
}
