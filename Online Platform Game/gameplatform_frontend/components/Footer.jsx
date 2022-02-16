import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Footer.module.css';

const Footer = () => (
  <div className={styles.footer}>
    <div className="footer-container" style={{ paddingBottom: '15px' }}>
      <div className="row justify-content-md-center">
        <div className="col-md-auto">MAIN</div>
        <div className="col-md-auto">ABOUT</div>
        <div className="col-md-auto">GAME FEATURES</div>
        <div className="col-md-auto">SYSTEM REQUIREMENTS</div>
        <div className="col-md-auto">QUOTES</div>
      </div>
    </div>
    <hr
      style={{
        color: 'white',
        backgroundColor: 'white',
        borderColor: 'white',
        border: '1px solid white',
      }}
    />
    <div className="footer-container">
      <div className="row">
        <div className="kiri col">
          © 2018 Your Games, Inc. All Rights Reserved
        </div>
        <div
          className="col"
          style={{
            justifyContent: 'right',
            float: 'right',
            textAlign: 'right',
          }}
        >
          Privacy Policy | Terms of Services | Code of Conduct
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
