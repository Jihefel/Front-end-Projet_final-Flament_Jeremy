import { useRef, useState } from "react";
import { Label, TextInput, Checkbox, Button, Modal } from "flowbite-react";
import { useRouter } from "next/router";
import Loader from "./common/Loader";

export default function SignUpForm() {
  const router = useRouter();

  const [isShown, setIsShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [colorExist, setColorExist] = useState();

  // Ref des inputs
  const prenom = useRef();
  const nom = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef();

  if (router.isFallback) {
    return <Loader />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAccount = {
      prenom: prenom.current.value,
      nom: nom.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    fetch("/api/accounts", {
      method: "POST",
      body: JSON.stringify(newAccount),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((result) => {
        if (result.message === "success") {
          router.push("/inscription/confirmation");
          prenom.current.value = "";
          nom.current.value = "";
          email.current.value = "";
          password.current.value = "";
          password2.current.value = "";
        } else {
          console.error(result.message);
        }
      })
      .catch((error) => {
        if (error.message === "Un compte existe déjà pour cet e-mail.") {
          setColorExist("failure");
        } else {
          console.error(error);
        }
      });
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 mx-48 mt-14 formulaire-inscription"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 flex">
            <Label htmlFor="prenom" value="Votre prénom" />
            <Label htmlFor="nom" value="Votre nom" className="mx-auto mb-1" />
          </div>
          <div className="flex justify-between gap-4">
            <TextInput
              id="prenom"
              type="text"
              required={!isShown}
              shadow={true}
              className="w-100"
              ref={prenom}
            />
            <TextInput
              id="nom"
              type="text"
              required={!isShown}
              shadow={true}
              className="w-100"
              ref={nom}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Votre email" color={colorExist} />
          </div>
          <TextInput
            id="email2"
            type="email"
            placeholder="elon.musk@spacex.com"
            required={!isShown}
            shadow={true}
            color={colorExist}
            onChange={
              colorExist === "failure"
                ? () => setColorExist(undefined)
                : undefined
            }
            helperText={
              colorExist === "failure" ? (
                <>
                  <span className="font-medium">Oups!</span> Un compte existe
                  déjà avec cette adresse e-mail !
                </>
              ) : undefined
            }
            ref={email}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Votre mot de passe" />
          </div>
          <TextInput
            id="password2"
            type="password"
            required={!isShown}
            shadow={true}
            ref={password}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="repeat-password"
              value="Répétez votre mot de passe"
            />
          </div>
          <TextInput
            id="repeat-password"
            type="password"
            required={!isShown}
            shadow={true}
            ref={password2}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="agree"
            required={!isShown}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <Label htmlFor="agree">
            Je suis d&apos;accord avec les
            <button
              className="text-blue-600 hover:underline dark:text-blue-500 ms-1"
              onClick={() => setIsShown(true)}
              type="button"
            >
              termes et conditions d&apos;utilisation
            </button>
          </Label>
        </div>
        <Button type="submit" className="w-1/3 mx-auto py-1">
          Créer un nouveau compte
        </Button>
      </form>
      <Modal show={isShown} onClose={() => setIsShown(false)} size="6xl">
        <Modal.Header className="bg-opacity-80 bg-slate-900">
          Termes et conditions d&apos;utilisation
        </Modal.Header>
        <Modal.Body className="bg-opacity-80 bg-slate-900">
          <div className="space-y-6 text-white">
            <ol className="leading-relaxed  list-decimal px-2 list-inside">
              <li className="mb-2">
                <h2 className="text-lg inline ms-2">Introduction</h2>
                <p className="text-slate-400 ms-4">
                  Bienvenue sur PlaNFT, un site web permettant l&apos;achat et
                  la vente de cartes NFT représentant des corps du système
                  solaire. En utilisant ce site, vous acceptez les termes et
                  conditions suivants. Veuillez les lire attentivement avant
                  d&apos;utiliser le site ou d&apos;acheter une carte NFT.
                </p>
              </li>
              <li className="mb-2">
                <h2 className="text-lg inline ms-2">
                  Propriété intellectuelle
                </h2>
                <p className="text-slate-400 ms-4">
                  Le contenu du site PlaNFT, y compris les images, les logos,
                  les textes et les marques de commerce, est la propriété de
                  PlaNFT et est protégé par les lois sur la propriété
                  intellectuelle. Vous n&apos;êtes pas autorisé à utiliser ou à
                  reproduire ce contenu sans l&apos;autorisation expresse de
                  PlaNFT.
                </p>
              </li>
              <li className="mb-2">
                <h2 className="text-lg inline ms-2">Achat de cartes NFT</h2>
                <p className="text-slate-400 ms-4">
                  L&apos;achat de cartes NFT sur PlaNFT se fait en utilisant la
                  crypto-monnaie spécifiée pour chaque carte. Une fois que vous
                  avez acheté une carte NFT, vous en devenez le propriétaire
                  unique. Cependant, veuillez noter que vous n&apos;achetez que
                  les droits d&apos;auteur de la carte NFT, pas les droits de
                  propriété intellectuelle sur l&apos;image originale du corps
                  céleste représenté.
                </p>
              </li>
              <li className="mb-2">
                <h2 className="text-lg inline ms-2">Responsabilité</h2>
                <p className="text-slate-400 ms-4">
                  PlaNFT n&apos;est pas responsable des pertes ou des dommages
                  causés par l&apos;utilisation de ce site ou de ses cartes NFT.
                  Nous ne garantissons pas que le site sera toujours disponible
                  ou que les cartes NFT seront exemptes de défauts. PlaNFT se
                  réserve le droit de modifier ou de suspendre le site à tout
                  moment.
                </p>
              </li>
              <li className="mb-2">
                <h2 className="text-lg inline ms-2">Utilisation du site</h2>
                <p className="text-slate-400 ms-4">
                  En utilisant PlaNFT, vous vous engagez à ne pas utiliser le
                  site à des fins illégales ou nuisibles. Vous acceptez
                  également de ne pas accéder ou tenter d&apos;accéder à des
                  informations privées ou confidentielles sur le site.
                </p>
              </li>
              <li className="mb-2">
                <h2 className="text-lg inline ms-2">
                  Divulgation des informations
                </h2>
                <p className="text-slate-400 ms-4">
                  Nous pouvons être amenés à divulguer vos informations
                  personnelles si cela est nécessaire pour nous conformer à une
                  ordonnance du tribunal ou à une loi applicable. Nous ne
                  vendrons ni ne louerons jamais vos informations personnelles à
                  des tiers.
                </p>
              </li>
              <li className="mb-2">
                <h2 className="text-lg inline ms-2">
                  Modification des termes et conditions
                </h2>
                <p className="text-slate-400 ms-4">
                  Nous nous réservons le droit de modifier ces termes et
                  conditions à tout moment, sans préavis. Votre utilisation
                  continue du site après ces modifications sera considérée comme
                  une acceptation de ces termes et conditions modifiés.
                </p>
              </li>
              <li className="mb-2">
                <h2 className="text-lg inline ms-2">Loi applicable</h2>
                <p className="text-slate-400 ms-4">
                  Ces termes et conditions sont régis par les lois de
                  l&apos;État où PlaNFT est incorporée. Tout litige découlant de
                  ces termes et conditions sera résolu par un tribunal compétent
                  dans cette juridiction.
                </p>
              </li>
            </ol>
            <strong className="text-center mt-5">
              En utilisant PlaNFT, vous acceptez ces termes et conditions. Si
              vous avez des questions ou des préoccupations, veuillez nous
              contacter.
            </strong>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-opacity-80 bg-slate-900">
          <Button
            onClick={() => {
              setIsChecked(true);
              setIsShown(false);
            }}
          >
            J&apos;accepte
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setIsChecked(false);
              setIsShown(false);
            }}
          >
            Je refuse
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
