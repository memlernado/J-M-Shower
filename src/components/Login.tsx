import { useState } from "react";
import { createMagicLink } from "../appwrite";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as TitleIcon } from "../assets/Profile.svg";
import { ReactComponent as TitleIcon2 } from "../assets/Profile (1).svg";
import { ReactComponent as CheckIcon } from "../assets/check.svg";
import { ReactComponent as Icon } from "../assets/undraw_mailbox_re_dvds 1.svg";

export function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const sendEmail = (email: string) => {
    const $id = uuidv4();
    createMagicLink($id, email).then(
      () => {
        setMessage("Enviado Correctamente");
        setEmailInput("");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      },
      () => {
        setMessage("Error al enviar, Intenta nuevamente");
      }
    );
  };
  return (
    <div className="login">
      <div className="loginTitle">
        <TitleIcon className="elipse1" />
        <TitleIcon2 className="elipse2" />
        <h1 className="heading1">MariaApp</h1>
        <h1 className="loginText heading4">Bienvenido ingresa tu email aqui</h1>
      </div>
      <form
        className="inputLoginField"
        onSubmit={(e) => {
          e.preventDefault();
          if (emailInput !== "") sendEmail(emailInput);
        }}
      >
        <input
          className="emailInput"
          type="email"
          name="email"
          placeholder="e.x.fulanito124@gmail.com"
          pattern="[a-z0-9.]+@[a-z]+.[a-z]{2,3}"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
        <button type="submit" className="deleteButtonStyle">
          <CheckIcon className="checkIcon" type="submit" />
        </button>
      </form>
      <p>{message}</p>
      <Icon className="loginIcon" />
    </div>
  );
}
