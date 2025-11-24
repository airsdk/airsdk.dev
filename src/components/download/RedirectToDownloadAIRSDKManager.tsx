import React, { useState, useMemo, useCallback, useEffect, Component } from 'react';
import { Octokit, App } from "octokit";
import Platform from 'react-platform-js';

type Operator = 'OR' | 'AND';

const TITLE = 'Download AIR SDK Manager';
const DESCRIPTION = '';


/**
 * Redirects the user to the appropriate AIR SDK Manager download based on platform and architecture.
 * If a single matching asset is found, initiates the download and navigates back.
 * If multiple assets are found, redirects to the installation instructions page.
 * 
 * This is a bit of a workaround since we can't do server-side redirects to external URLs easily.
 * Will be used mainly as a utility for download links from other sites. 
 */

class RedirectToDownloadAIRSDKManager extends Component<{ platform?: string, architecture?: string }> {

  state = {
    loading: true,
    platform: '',
    architecture: '',
    downloadUrl: '',
    assets: [],
  };

  componentDidMount() {
    var { platform, architecture } = this.props;
    if (!platform || platform.length === 0) {
      platform = this.detectOS();
    }
    if (!architecture || architecture.length === 0) {
      architecture = this.detectArchitecture();
    }
    console.log("Detected platform: " + platform + ", architecture: " + architecture);
    this.setState({ architecture, platform });

    const octokit = new Octokit({});
    octokit.rest.repos.getLatestRelease({
      owner: "airsdk",
      repo: "airsdkmanager-releases"
    })
      .then((data) => {
        if (data.status != 200) return;
        const { data: { assets: allAssets } } = data;
        const assetExt = this.getExtForPlatform();

        const checkArchitecture = (this.state.architecture && this.state.architecture.length > 0);
        let platformAssets = allAssets.filter(asset => {
          return asset.name.endsWith(assetExt);
        });

        if (platformAssets.length > 1) {
          platformAssets = platformAssets.filter(asset => {
            return asset.name.toLowerCase().includes(this.state.architecture);
          });
        }

        this.setState({
          loading: false,
          assets: platformAssets,
        });

      })
      .catch(console.log);

  }


  componentDidUpdate(prevProps: Readonly<{ platform?: string; architecture?: string; }>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.state.assets) {
      if (this.state.assets.length == 1) {
        const url = this.state.assets[0].browser_download_url;
        this.startDownloadAndGoBack(url);
      }
      else if (this.state.assets.length >= 1) {
        window.location.href = "/docs/basics/install/" + this.state.platform;
      }
    }
  }

  startDownloadAndGoBack = (url: string) => {
    if (typeof window === 'undefined' || !url) return;

    // Start download without navigating away by creating a hidden iframe.
    // This usually triggers the browser download for cross-origin assets.
    try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);

      // Clean up the iframe after a while
      setTimeout(() => {
        try { document.body.removeChild(iframe); } catch (e) { /* ignore */ }
      }, 15000);
    } catch (e) {
      // Fallback: try opening in a new tab (may be blocked by popup blockers)
      try { window.open(url, '_blank'); } catch (ex) { /* ignore */ }
    }

    // Give the browser a moment to start the download, then navigate back.
    setTimeout(() => {
      try {
        window.history.back();
      } catch (e) {
        // final fallback: redirect to homepage
        window.location.href = '/';
      }
    }, 1000);
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
    switch (this.state.platform) {
      case 'macos': return 'pkg';
      case 'windows': return 'msi';
      case 'linux': return 'zip';
    }
    return '___';
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading ...</div>
        ) : (
          <div>Redirecting ...</div>
        )}
      </div>
    );
  }
}

export default RedirectToDownloadAIRSDKManager;
