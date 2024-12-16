import React from 'react';

interface EmailTemplateProps {
  firstName: string;
  code: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName, code }) => {
  const styles = {
    body: {
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'center' as 'center',
      alignItems: 'center' as 'center',
      minHeight: '100vh',
      backgroundColor: '#fff',
    },
    container: {
      textAlign: 'center' as 'center',
      paddingBlock: '20px'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    icon: {
      width: '150px',
      margin: '20px auto',
    },
    h1: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    p: {
      fontSize: '0.9rem',
      color: '#555',
      marginBottom: '20px',
      lineHeight: '1.5',
    },
    a: {
      color: '#fff',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <img src='https://s3-alpha-sig.figma.com/img/6d00/888d/07bdb45817485d418eeb79c74af4bb93?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GxAscHyedFBs3M9799IrxLwbSN2OHTDgs6D8Earhks1me0jCge-x1C2epZYl9DiOmC3m1XtTrZr8rhUZ~fvQZzPqTl6cQ36FrSytSuKREjbT1lUDXjsDI8ihBLti-yWDDN3H6q8Oo7Tu4mYJlXRsJ~uSXF0LYd~COw0E2F9ATiXk-EXxesvTjZvLUj7t2yKk4XzMyETZ4BbmkML7WTDqh5J1d4tiocQZkt7DTT2TvmCF5gx7suFZI7TjalFzgFHTsPo~eYXiZDdP-MtvCaHd5tnWGsi6w-YVMq6k8Zh9a~4Um8A6yBLep~rXJhAKCtynTj-mLFXyWqjssfst-6fmGA__' alt="logo Icon" style={styles.icon} />
        </div>
        {/* <img src={mail_image} alt="Envelope Icon" style={styles.icon} /> */}
        <h1 style={styles.h1}>Hi! {firstName}</h1>
        <p style={styles.p}><a href="/">Welcome to TradePhere</a></p>
        <p style={styles.p}>
          Trade Phere is a trading company where you can be a part of the peer-to-peer exchange community worldwide. Using modern business methods and person-to-person client approach, we offer a unique investment model to traders of bitcoin and other methods.
        </p>
        <p style={styles.p}>Verify your email</p>
        <h1 style={styles.h1}>{code}</h1>
      </div>
    </div>
  );
};

export default EmailTemplate;