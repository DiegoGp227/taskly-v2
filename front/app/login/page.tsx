import FormLogin from "@/src/form/auth/FormLogin";
import CreateAccount from "./components/atoms/CreateAccount";

function LoginPage() {
  return (
    <>
      <main className="w-screen h-screen flex justify-center items-center">
        <div className="w-96 h-[400px] flex flex-col items-center border-2 border-soft-gray justify-evenly rounded">
          <h1 className="text-white font-bold text-4xl">Login</h1>
          <FormLogin />
          <CreateAccount />
        </div>
      </main>
    </>
  );
}

export default LoginPage;
