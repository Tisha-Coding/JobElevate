import { Webhook } from "svix";
import User from "../models/User.js";


// API Controller Function to Manage Clerk User with database
const clerkWebhooks = async(req,res) =>
{
    try
    {
        //  Create a Svix instance with Clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // Verifying Headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })


        // Getting Data from request body
        const {data,type} = req.body

        // Switch Cases for different Events
        switch(type)
        {
            case 'user.created': 
            {
                 const userData = {
                    _id: data.id, //receiving the clerk user id
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: '' // whenever the user will be created this resume will be am empty string

                 }
                //    save this data in a db
                await User.create(userData)
                response.json({})
                break;

            }

            case 'user.updated':
                {
                    const userData = {
                        email: data.email_addresses[0].email_address,
                        name: data.first_name + " " + data.last_name,
                        image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;
            }

            case 'user.deleted':
                {
                    await User.findByIdAndDelete(data.id);
                    res.json({})
                    break;
                } 
                
            default:
                break;    

        }


    }catch(error)
    {
             console.log(error.message);
             res.json({success: false,message: 'Webhooks Error'})
    }
}

export {clerkWebhooks};