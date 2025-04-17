import React, { useEffect, Component } from 'react';
import styles from './AIRSDKDownload.module.css';
import { Octokit, App } from "octokit";
import Platform from 'react-platform-js';
import DownloadButton from './DownloadButton';

class AIRSDKManagerDownload extends Component<{ platform?: string }> {

  state = {
    loading: true,
    downloadUrl: '',
    acceptedLicense: false,
    architecture: '',
    assets: [],
  };

  componentDidMount() {
    this.state.acceptedLicense = sessionStorage.getItem('acceptedLicense') === 'true';

    // Detect system architecture
    const architecture = this.detectArchitecture();
    this.setState({ architecture });

    const octokit = new Octokit({});
    octokit.rest.repos.getLatestRelease({
      owner: "airsdk",
      repo: "airsdkmanager-releases"
    })
      .then((data) => {
        if (data.status != 200) return;
        const { data: { assets } } = data;
        const assetExt = this.getExtForPlatform();

        const checkArchitecture = (this.state.architecture && this.state.architecture.length > 0);
        console.log( checkArchitecture +":"+ this.state.architecture );
        let platformAssets = assets.filter(asset => {
          return asset.name.endsWith(assetExt);
        });

        console.log( this.state.architecture);

        platformAssets = platformAssets.sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          if (aName.includes(this.state.architecture)) return -1;
          if (bName.includes(this.state.architecture)) return 1;
          return 0;
        });
          
        console.log('Platform Assets:', platformAssets);

        this.setState({
          loading: false,
          assets: platformAssets,
        });
        
      })
      .catch(console.log);

  }

  getDisplayArchitecture = () => {
    switch (this.state.architecture) {
      case 'aarch64':
        return 'ARM64';
      case 'amd64':
        return 'x86_64';
    }
    return '';
  }

  detectArchitecture = () => {
    if (typeof window === 'undefined') return '';
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('arm64') || userAgent.includes('aarch64')) {
      return 'aarch64';
    }
    if (userAgent.includes('x86_64') || userAgent.includes('x64') || 
        userAgent.includes('amd64') || userAgent.includes('wow64')) {
      return 'amd64';
    }
    if (userAgent.includes('x86') || userAgent.includes('i686') || 
        userAgent.includes('i386')) {
      return 'x86';
    }
    const platform = navigator.platform;
    if (platform) {
      if (platform.includes('arm') || platform.includes('ARM')) {
        return 'aarch64';
      }
      if (platform.includes('64')) {
        return 'amd64';
      }
      if (platform.includes('86')) {
        return 'x86';
      }
    }
    return 'amd64';
  }

  detectOS = () => {
    const os = Platform.OS.toLowerCase();
    if (os) {
      if (os.includes('mac')) {
        return 'macos';
      } else if (os.includes('win')) {
        return 'windows';
      } else if (os.includes('linux') || os.includes('nix')) {
        return 'linux';
      }
    }
    return "";
  }

  getExtForPlatform = () => {
    switch (this.props.platform) {
      case 'macos': return 'pkg';
      case 'windows': return 'msi';
      case 'linux': return 'zip';
    }
    return '___';
  }

  labelForAsset = (asset) => {
    if (asset.name.includes('aarch64')) {
      return "Download (arm64)";
    }
    if (asset.name.includes('amd64')) {
      return "Download (x86_64)";
    }
    return "Download";
  }


  render() {
    return (
      <div className={styles.content}>
        {this.state.loading ? (
          <div>Loading ...</div>
        ) : (
          <div>
            <div>
              { 
                this.state.assets.map( (asset, i) => (
                  <DownloadButton key={i} downloadUrl={asset.browser_download_url} label={ this.labelForAsset(asset) } highlight={i == 0}/>
                ))
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AIRSDKManagerDownload;
