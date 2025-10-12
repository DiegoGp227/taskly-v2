"use client";
import { LuSendHorizontal } from "react-icons/lu";

function FormLogin() {
  const sendData = (e: React.FormEvent) => {
    alert("Sending data...");
  };
  return (
    <form className="flex flex-col items-center" onSubmit={sendData}>
      <input type="text" placeholder="Email" className="input" />
      <input type="password" placeholder="Password" className="input" />
      <button className="button" type="submit">
        <p>Send</p>
        <LuSendHorizontal />
      </button>
    </form>
  );
}

export default FormLogin;
