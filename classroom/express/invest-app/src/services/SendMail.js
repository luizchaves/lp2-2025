import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';

async function createNewUser(to) {
  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreply@investapp.com',
      to,
      subject: 'Conta criada no Invest App',
      text: `Conta criada com sucesso.\n\nAcesse o aplicativo para gerenciar seus investimentos.`,
      html: `<h1>Conta criada com sucesso.</h1><p>Acesse o aplicativo para gerenciar seus investimentos.</p>`,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Email enviado: ${nodemailer.getTestMessageUrl(info)}`);
    }

    return info;
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    throw new Error(`Falha ao enviar email: ${err.message}`);
  }
}

export default { createNewUser };
