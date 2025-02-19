import PaperList from "../components/PaperList";

export default function Dashboard({ userAddress }) {
    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Your Research Papers</h1>
            <PaperList userAddress={userAddress} />
        </div>
    );
}
