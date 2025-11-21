import React, { useEffect, Component } from 'react';
import styles from './AIRSDKDownload.module.css';
import AIRSDKAcceptLicenseButton from './AIRSDKAcceptLicenseButton';
import DownloadButton from './DownloadButton';

class AIRSDKDownload extends Component<{ platform?: string }> {
  airAPIURL =
    'https://api.airsdk.harman.com/releases/latest/urls';

  airDownloadURL = 'https://airsdk.harman.com';

  state = {
    loading: true,
    airsdkurls: [],
    acceptedLicense: false,
  };

  handleAccept = () => {
    sessionStorage.setItem('acceptedLicense', 'true');
    this.setState({ acceptedLicense: true });
  };

  componentDidMount() {
    this.state.acceptedLicense = sessionStorage.getItem('acceptedLicense') === 'true';

    fetch(this.airAPIURL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          loading: false,
          airsdkurls: data,
        });
      })
      .catch(console.log);
  }

  downloadURLForPlatform = (forFlex: boolean) => {
    var urlType: string = 'AIR_' + (forFlex ? 'Flex_' : '');
    switch (this.props.platform) {
      case 'macos':
        urlType += 'Mac';
        break;
      case 'windows':
        urlType += 'Win';
        break;
      case 'linux':
        urlType += 'Linux';
        break;
    }
    this.props.platform;
    return (
      this.airDownloadURL +
      this.state.airsdkurls[urlType] +
      '?license=' +
      (this.state.acceptedLicense ? 'accepted' : 'denied')
    );
  };

  render() {
    const acceptedLicense = this.state.acceptedLicense;
    return (
      <div className={styles.content}>
        {this.state.loading ? (
          <div>Loading ...</div>
        ) : (
          <div>
            {!acceptedLicense ? (
              <AIRSDKAcceptLicenseButton handleAccept={this.handleAccept} />
            ) : (
              <div>
                <DownloadButton downloadUrl={this.downloadURLForPlatform(false)}
                  label="Download"
                />
                
                <DownloadButton downloadUrl={this.downloadURLForPlatform(true)}
                  label="Download for Flex"
                  highlight={false}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AIRSDKDownload;
