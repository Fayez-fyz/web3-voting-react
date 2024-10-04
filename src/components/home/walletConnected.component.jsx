import PropTypes from "prop-types";
import { RingLoader } from "react-spinners";

const WalletConnectedComponent = ({
  account,
  remainingTime,
  candidateDetails,
  candidateNumber,
  setCandidateNumber,
  voteFunction,
  showButton,
  isLoading,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-slate-200 text-3xl font-bold">
          Your are connected to Metamask account
        </h1>
        <p className="text-center text-xl font-normal text-slate-200 ">
          Metamask Account: {account}
        </p>
        <p className="text-center text-xl font-normal text-slate-200 ">
          Remaining Time: {remainingTime}
        </p>
      </div>
      <div className="mt-10">
        {showButton ? (
          <p className="text-green-500 text-center text-lg">
            You have already voted
          </p>
        ) : (
          <div className="flex justify-center items-center gap-2 mt-5">
            <input
              type="number"
              placeholder="Entern Candidate Serial Number"
              value={candidateNumber}
              className="p-2 rounded-md text-black w-1/2"
              onChange={(e) => setCandidateNumber(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md text-lg"
              onClick={voteFunction}
            >
              Vote
            </button>
          </div>
        )}
      </div>
      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center mt-2">
            <RingLoader color="#36d7b7" size={100} />
          </div>
        ) : (
          <table className="table-auto w-full border-2 border-slate-600">
            <thead>
              <tr className="bg-slate-700 border-b-2 border-slate-600">
                <th className="text-center text-xl font-bold text-slate-200">
                  S.No
                </th>
                <th className="text-center text-xl font-bold text-slate-200">
                  Candidate name
                </th>
                <th className="text-center text-xl font-bold text-slate-200">
                  Candidate votes
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {candidateDetails?.map((candidate, index) => (
                <tr key={index}>
                  <td className="text-center text-xl text-slate-200 border-b-2 border-r-2 border-slate-600">
                    {candidate.id}
                  </td>
                  <td className="text-center text-xl text-slate-200 border-b-2 border-r-2 border-slate-600">
                    {candidate.name}
                  </td>
                  <td className="text-center text-xl text-slate-200 border-b-2 border-r-2 border-slate-600">
                    {candidate.voteCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

WalletConnectedComponent.propTypes = {
  account: PropTypes.string.isRequired,
  remainingTime: PropTypes.string.isRequired,
  candidateDetails: PropTypes.array.isRequired,
  candidateNumber: PropTypes.string.isRequired,
  setCandidateNumber: PropTypes.func.isRequired,
  voteFunction: PropTypes.func.isRequired,
  showButton: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default WalletConnectedComponent;
