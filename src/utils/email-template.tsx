import * as React from 'react';

interface EmailTemplateProps {
  Name: string;
  Email: String,
  Text: String,
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Name,Email, Text
}) => (
  <div dir='rtl'>
    <h3>نام: {Name}</h3>
    <h3>ایمل: {Email}</h3>
    <div className=' border-t-2'>
      <h3>متن پیام : </h3>
      <p>{Text}</p>
    </div>
  </div>
);