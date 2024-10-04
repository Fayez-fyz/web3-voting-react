import PropTypes from "prop-types";

const LoginComponent = ({ connectWallet }) => {
  return (
    <div>
      <h1 className="text-center text-slate-200 text-3xl font-bold">
        Welcome to Decentralized Voting System
      </h1>

      <div className="flex justify-center w-full">
        <button
          className="bg-slate-200 text-black px-4 py-2 rounded-md  mt-4 text-semibold text-lg"
          onClick={connectWallet}
        >
          Login with Metamask
        </button>
      </div>
    </div>
  );
};

LoginComponent.propTypes = {
  connectWallet: PropTypes.func.isRequired,
};
export default LoginComponent;
