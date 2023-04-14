import { Textarea, Label, Button } from "flowbite-react";
import { Container } from 'react-bootstrap';
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { BiMailSend } from "react-icons/bi"

function Contact() {
  const textarea = useRef()


  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact</title>
      </Head>
      <Container>
        <h1 className="text-white text-6xl mb-5">Contactez-nous</h1>
        <form>
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
          <Button color="purple" className="w-auto mx-auto mt-3" type="submit">
            Envoyer &thinsp;<BiMailSend />
          </Button>
        </form>
      </Container>
    </>
  );
}

export default Contact;
