import { useRef } from "react";
import { Label, TextInput, Checkbox, Button, Modal } from "flowbite-react";

export default function SignUpForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const newAccount = {
          email: email.current.value,
          password: newPhone.current.value,
        };
    
        fetch("../data", {
          method: "POST",
          body: JSON.stringify(newContact),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((result) => result.json());
        newName.current.value = "";
        newPhone.current.value = "";
        newEmail.current.value = "";
      }


  return (
    <form className="flex flex-col gap-4 mx-48 my-60 formulaire-inscription" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 flex">
          <Label htmlFor="prenom" value="Votre prénom" />
          <Label htmlFor="nom" value="Votre nom" className="mx-auto mb-1"/>
        </div>
        <div className="flex justify-between gap-4">
          <TextInput
            id="prenom"
            type="text"
            required={true}
            shadow={true}
            className="w-100"
          />
          <TextInput
            id="nom"
            type="text"
            required={true}
            shadow={true}
            className="w-100"
          />
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Votre email" />
        </div>
        <TextInput
          id="email2"
          type="email"
          placeholder="elon.musk@spacex.com"
          required={true}
          shadow={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Votre mot de passe" />
        </div>
        <TextInput
          id="password2"
          type="password"
          required={true}
          shadow={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password" value="Répétez votre mot de passe" />
        </div>
        <TextInput
          id="repeat-password"
          type="password"
          required={true}
          shadow={true}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree">
          Je suis d&apos;accord avec les
          <button
            className="text-blue-600 hover:underline dark:text-blue-500 ms-1"
          >
            termes et conditions
          </button>
          <Modal
    show={false}
  >
    <Modal.Header>
      Terms of Service
    </Modal.Header>
    <Modal.Body>
      <div className="space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
        </p>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button>
        I accept
      </Button>
      <Button
        color="gray"
      >
        Decline
      </Button>
    </Modal.Footer>
  </Modal>
        </Label>
      </div>
      <Button type="submit" className="w-1/3 mx-auto py-1">Créer un nouveau compte</Button>
    </form>
  );
}