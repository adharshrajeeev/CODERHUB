import FriendSuggestions from "../suggestions/FriendSuggestions";
import "./rightBar.scss";



const RightBar = ({userId}) => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">

          <FriendSuggestions userId={userId}/>

        </div>
        <div className="item">
          <span>Latest Activities</span>
          
        
        </div>
        <div className="item">
          <span>Online Friends</span>
         
        </div>
      </div>
    </div>
  );
};

export default RightBar;
