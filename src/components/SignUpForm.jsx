import { useRef, useState } from "react";
import { Label, TextInput, Checkbox, Button, Modal } from "flowbite-react";
import { useRouter } from "next/router";
import Loader from "./common/Loader";
import TermsConditions from "./common/TermsConditions";


export default function SignUpForm() {
  const router = useRouter();

  const [isShown, setIsShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [colorExist, setColorExist] = useState();
  const [isSamePassWords, setIsSamePassWords] = useState(true);

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

    if (password.current.value !== password2.current.value) {
      setIsSamePassWords(false)
      return
    } else {
      setIsSamePassWords(true)
    }

    const newAccount = {
      prenom: prenom.current.value,
      nom: nom.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    fetch("./api/accounts", {
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
          setTimeout(() => {
            router.push("/");
          }, 400);
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
            color={isSamePassWords === false ? 'failure' : undefined}
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
            color={isSamePassWords === false ? 'failure' : undefined}
            helperText={
              isSamePassWords === false ? (
                <>
                  <span className="font-medium">Oups!</span> Les mots de passes ne correspondent pas !
                </>
              ) : undefined
            }
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
          <TermsConditions></TermsConditions>
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
