import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Axios } from "../../../axios/userInstance";

const Rating = ({ postId }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(null);

  const fetchRatingData = async () => {
    try {
      const response = await Axios.get(`/api/rating/${postId}`);
      if (response.status === 200) {
        setAverageRating(response.data.averageRating);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRatingData();
  }, [postId]);

  const handleRatingSubmit = async () => {
    try {
      if (rating !== null) {
        await Axios.post(`/api/ratePost/${postId}`, { rating });
        await fetchRatingData(); // Update average rating after submitting rating
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
            />
            <FaStar
              size={20}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
              onClick={handleRatingSubmit} // Call handleRatingSubmit on click
            />
          </label>
        );
      })}
      <p className="ml-2">Avg: {averageRating}</p>
    </div>
  );
};

export default Rating;
