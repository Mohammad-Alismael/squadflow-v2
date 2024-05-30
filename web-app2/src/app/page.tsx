import Head from "next/head";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>SquadFlow - Project Management Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to SquadFlow</h1>

        <p className="mt-3 text-2xl">
          The ultimate project management tool for your team.
        </p>

        <div className="mt-12">
          <a
            href="/auth"
            className="bg-green-800 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full"
          >
            Sign Up
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          href="https://www.squadflow.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by SquadFlow
        </a>
      </footer>
    </div>
  );
}
