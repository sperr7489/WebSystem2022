import "../css/loading.css";
import Spinner from "../assets/Spinner2.gif";
export default function Loading() {
  return (
    <div id="Loading">
      <span id="Loading_Text">잠시만 기다려주세요</span>
      <img src={Spinner} alt="로딩중" width="10%" />
    </div>
  );
}
