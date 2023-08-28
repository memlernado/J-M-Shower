import { useState } from "react";
import { createMagicLink } from "../appwrite";
import { v4 as uuidv4 } from "uuid";

export function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const sendEmail = (email: string) => {
    const $id = uuidv4();
    createMagicLink($id, email)
      .then(() => {
        setMessage("Enviado Correctamente");
        setEmailInput("");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      })
      .catch(() => {
        setMessage("Error al enviar, Intenta nuevamente");
      });
  };
  return (
    <div>
      <h1>Ingresa tu email para recibir el link</h1>

      <input
        type="email"
        name="email"
        placeholder="maria@example.com"
        pattern="[a-z0-9.]+@[a-z]+.[a-z]{2,3}"
        value={emailInput}
        onChange={(e) => {
          setEmailInput(e.target.value);
        }}
      />
      <button
        type="submit"
        onClick={() => {
          sendEmail(emailInput);
        }}
      >
        Enviame el Link!
      </button>
      <p>{message}</p>
    </div>
  );
}
