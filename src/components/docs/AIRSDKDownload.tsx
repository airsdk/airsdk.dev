import React, { Component } from 'react';
import styles from './AIRSDKDownload.module.css';
import AIRSDKAcceptLicenseButton from './AIRSDKAcceptLicenseButton';
import DownloadButton from './DownloadButton';

class AIRSDKDownload extends Component<{ platform?: string }> {
  airAPIURL =
    'https://api.airsdk.dev/releases/latest/urls';

  airDownloadURL = 'https://assets.airsdk.dev';

  state = {
    loading: true,
    airsdkurls: {} as Record<string, string>,
    error: false,
    acceptedLicense: false,
  };

  handleAccept = () => {
    sessionStorage.setItem('acceptedLicense', 'true');
    this.setState({ acceptedLicense: true });
  };

  componentDidMount() {
    this.setState({
      acceptedLicense: sessionStorage.getItem('acceptedLicense') === 'true',
    });

    fetch(this.airAPIURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`AIR SDK download request failed: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          loading: false,
          airsdkurls: data,
        });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
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
        ) : this.state.error ? (
          <div role="alert">
            Download links are currently unavailable.{' '}
            <a href={this.airDownloadURL}>Download AIR SDK from HARMAN</a>.
          </div>
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
