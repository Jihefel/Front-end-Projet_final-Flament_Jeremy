import { Textarea, Label, Button, TextInput } from "flowbite-react";
import { Container } from "react-bootstrap";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { BiMailSend } from "react-icons/bi";
import comptes from "../data/comptes.json";

function Contact() {
  const textarea = useRef();
  const subject = useRef();
  const [compteActuel, setCompteActuel] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const account = comptes?.find((compte) => compte.isConnected === true);
    setCompteActuel(account);
  }, [comptes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (compteActuel === undefined) {
      setError("Veuillez vous connecter pour envoyer un message")
      return
    } else {
      setError("Soumission de message pas encore disponible")
    }

    // const updatedAccount = {
    //   ...compteActuel,
    //   messages: [
    //     ...compteActuel.messages,
    //     { subject: subject.current.value, content: textarea.current.value },
    //   ],
    // };

    // fetch(`/api/accounts/`, {
    //   method: "PUT",
    //   body: JSON.stringify(updatedAccount),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((result) => result.json())
    //   .catch((error) => console.error(error));
  };

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact</title>
      </Head>
      <Container>
        <h1 className="text-white text-6xl mb-5">Contactez-nous</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="subject" value="Sujet" />
            </div>
            <TextInput
              id="subject"
              type="text"
              placeholder="Sujet"
              required={true}
              ref={subject}
              helperText={error}
            />
          </div>
          <div id="textarea">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Votre message" />
            </div>
            <Textarea
              id="comment"
              placeholder="Votre message..."
              required={true}
              rows={4}
              ref={textarea}
            />
          </div>
          <Button
            color="purple"
            className="w-auto mx-auto mt-3"
            type="submit"
          >
            Envoyer &thinsp;
            <BiMailSend />
          </Button>
        </form>
      </Container>
    </>
  );
}

export default Contact;
