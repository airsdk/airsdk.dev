import React, { useEffect, Component } from 'react';
import clsx from 'clsx';
import styles from './AIRSDKAcceptLicenseButton.module.css';

class AIRSDKAcceptLicenseButton extends Component<{ handleAccept?: Function }> {
  acceptButtonClick = () => {
    console.log('acceptButtonClick()');
    const { handleAccept } = this.props;
    handleAccept();
  };
  render() {
    return (
      <div>
        <div>
          In order to download the AIR SDK you must accept the{' '}
          <a href="https://airsdk.harman.com/assets/pdfs/HARMAN%20AIR%20SDK%20License%20Agreement.pdf">
            license agreement
          </a>
        </div>
        <div>
          <a
            className={clsx('button', 'button--info', 'button--lg', styles.acceptButton)}
            onClick={this.acceptButtonClick}
          >
            Accept
          </a>
        </div>
      </div>
    );
  }
}

export default AIRSDKAcceptLicenseButton;
