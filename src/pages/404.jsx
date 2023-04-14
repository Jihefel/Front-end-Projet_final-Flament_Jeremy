import Head from "next/head";
import Link from "next/link";

function Error404() {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Page not found</title>
      </Head>
      <div className="grid place-items-center px-6 lg:px-8">
        <div className="text-center pb-72">
          <p className="text-base font-semibold text-white">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-white">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-white">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error404;
