import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="text-center mt-20">
      <h2 className="text-xl font-bold">回答ありがとうございました！</h2>
      <Link to="/" className="text-blue-500">戻る</Link>
    </div>
  );
};

export default ThankYouPage;
