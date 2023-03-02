import React, { useEffect, Component } from 'react';
import clsx from 'clsx';
import styles from './AIRSDKDownload.module.css';
import Link from '@docusaurus/Link';
import AIRSDKAcceptLicenseButton from './AIRSDKAcceptLicenseButton';

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
                <Link
                  className={clsx(
                    'button',
                    'button--info',
                    'button--lg',
                    styles.downloadButton
                  )}
                  to={this.downloadURLForPlatform(false)}
                >
                  <i>
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      className={styles.downloadIcon}
                      viewBox="0 0 29.978 29.978"
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012
      v-8.861H25.462z"
                        />
                        <path
                          fill="currentColor"
                          d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723
      c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742
      c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193
      C15.092,18.979,14.62,18.426,14.62,18.426z"
                        />
                      </g>
                    </svg>
                  </i>
                  Download
                </Link>

                <Link
                  className={clsx(
                    'button',
                    'button--primary',
                    'button',
                    styles.downloadButton
                  )}
                  to={this.downloadURLForPlatform(true)}
                >
                  <i>
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      className={styles.downloadIcon}
                      viewBox="0 0 29.978 29.978"
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012
      v-8.861H25.462z"
                        />
                        <path
                          fill="currentColor"
                          d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723
      c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742
      c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193
      C15.092,18.979,14.62,18.426,14.62,18.426z"
                        />
                      </g>
                    </svg>
                  </i>
                  Download for Flex
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AIRSDKDownload;
