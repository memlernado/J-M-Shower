import { useState } from "react";
import { createMagicLink } from "../appwrite";

export function Login() {
  const [emailInput, setEmailInput] = useState("");
  const sendEmail = (email: string) => {
    try {
      const id = "123456";
      createMagicLink(id, email);
      setEmailInput("");
      console.log("Enviado Correctamente");
    } catch (error) {
      console.log("Error al enviar, Intenta nuevamente");
    }
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
    </div>
  );
}
