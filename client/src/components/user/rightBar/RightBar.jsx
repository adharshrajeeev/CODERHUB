
import FriendSuggestions from "../suggestions/FriendSuggestions";
import "./rightBar.scss";



const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <FriendSuggestions/>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
