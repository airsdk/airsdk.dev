import React, { useState, useMemo, useCallback, useEffect } from 'react';
import RedirectToDownloadAIRSDKManager from '../../../components/download/RedirectToDownloadAIRSDKManager';

function useSearchParams(): [URLSearchParams] {
  const [searchString, setSearchString] = useState(() => typeof window !== 'undefined' ? window.location.search : '');

  useEffect(() => {
    const onLocationChange = () => setSearchString(window.location.search || '');
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const params = useMemo(() => new URLSearchParams(searchString), [searchString]);
  return [params];
}

function RedirectDownload() {
    const [searchParams] = useSearchParams();

  const platform = searchParams.get('platform');
  const architecture = searchParams.get('arch');

  return (
    <RedirectToDownloadAIRSDKManager platform={platform} architecture={architecture} />
  );
}

export default RedirectDownload;
