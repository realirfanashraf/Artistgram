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
        await fetchRatingData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center ">
      <div className="flex items-center">
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
                onClick={handleRatingSubmit}
                className="mr-1"
              />
            </label>
          );
        })}
      </div>
      <div className="flex items-center">
        <FaStar className="text-yellow-500" size={20} />
        <p className="ml-1">{averageRating !== null ? averageRating.toFixed(1) : "N/A"}</p>
      </div>
    </div>

  );
};

export default Rating;
