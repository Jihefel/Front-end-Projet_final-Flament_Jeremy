import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/assets/images/orrery_icon.svg";
import Head from "next/head";

function Connexion() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [comptes, setComptes] = useState("");
  const [compteActuel, setCompteActuel] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    accountCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accountCheck = () => {
    fetch("/api/accounts", {})
      .then((result) => result.json())
      .then((datas) => setComptes(datas));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const accountActuel = comptes.find(
      (account) => account.email === email && account.password === password
    );
    const updatedAccount = { ...accountActuel, isConnected: true };
    fetch("/api/accounts", {
      method: "PUT",
      body: JSON.stringify(updatedAccount),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((responseData) => {
        if (!accountActuel) {
          setErrorMessage(
            "Compte inconnu avec cette adresse e-mail et ce mot de passe. Veuillez revérifier les deux."
          );
          return;
        }
        // Mettre à jour le compte actuel
        const updatedAccounts = [...comptes];
        updatedAccounts[updatedAccounts.indexOf(accountActuel)] =
          updatedAccount;
        setComptes(updatedAccounts);
        setCompteActuel(updatedAccount);
        // Naviguer vers la page suivante
        setTimeout(() => {
          router.push("/");
        }, 400);
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Connexion</title>
      </Head>
      <div className="flex min-h-full items-center justify-center px-4 py-24 sm:px-6 lg:px-8 w-100">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="logo PlaNFT"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              Connectez-vous à votre compte
            </h2>
          </div>
          <div className="text-red-500 text-sm mt-2" id="error-message">
            {errorMessage && <p>{errorMessage}</p>}
            {compteActuel.prenom === undefined ? (
              ""
            ) : (
              <p className="text-white">Bonjour, {compteActuel.prenom}</p>
            )}
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Adresse e-mail
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Connexion;
