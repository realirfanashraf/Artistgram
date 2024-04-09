import postSchema from "../../model/userModels/postModel.js";
import userSchema from "../../model/userModels/userModel.js";
import eventSchema from "../../model/adminModels/eventModel.js"
import paymentSchema from "../../model/adminModels/paymentModel.js"
import Stripe from 'stripe'


export const editPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { description } = req.body;

        const post = await postSchema.findById(postId);

        if (post) {
            post.description = description;

            await post.save();

            res.status(200).json({ message: "Post updated successfully" });
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await postSchema.findByIdAndDelete(postId);
      if (post) {
        res.status(200).json({ success: true, message: "Post deleted successfully." });
      } else {
        res.status(404).json({ success: false, message: "Post not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred while deleting the post." });
    }
  };
  

  

  export const paymentSession = async (req, res) => {

    console.log("data isdfli;jasdif")
      try {
          const { userId, eventId } = req.body;
          const user = await userSchema.findById(userId);
          const event = await eventSchema.findById(eventId);
          const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
          console.log(event)
  
          if (!user || !event) {
              return res.status(404).json({ success: false, message: 'User or event not found' });
          }
  
          const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              mode: 'payment',
              success_url: `http://localhost:5173/payment-success/${event._id}`,
              cancel_url: 'http://localhost:5173/payment-cancel',
              customer_email: user.email, 
              client_reference_id: eventId, 
              line_items: [
                  {
                      price_data: {
                          currency: 'bdt',
                          unit_amount: event.amount * 100,
                          product_data: {
                              name: event.title,
                              description: event.description,
                          }
                      },
                      quantity: 1,
                  },
              ],
          });
  
          res.status(200).json({ success: true, message: 'Checkout session created!', session });
      } catch (error) {
          console.log('Error when creating checkout session:', error);
          res.status(500).json({ success: false, message: 'Error creating checkout session' });
      }
  };


  export const paymentDone = async (req, res) => {
    try {
        const { eventId } = req.body;
        const { userId } = req.query;
        const event = await eventSchema.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const payment = new paymentSchema({
            event: event._id,
            user: user._id,
            amount: event.amount 
        });

        await payment.save();

        res.status(200).json({ message: 'Payment successfully recorded.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};