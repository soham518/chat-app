import {resendClient, sender} from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"
export const sendWelcomeEmail = async(email,name,clientURL) =>{
  try{
  const {data, error} = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: createWelcomeEmailTemplate(name,clientURL)
  });
  }catch(err) {
    console.log("error while sending welcome email",err);
  }
  
  
}