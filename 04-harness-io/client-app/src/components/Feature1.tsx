import React, { memo } from 'react';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';


const Feature1 = memo(function () {
  const { flags } = useFeatureFlags();

  if (flags.loading) {
    return (<div>Loading feature flags...</div>);
  }
  if (flags.error) {
    return (<div>Error fetching feature flags: {flags.error.message}</div>);
  }
  if (flags.data?.ONE) {
    return (<div>Feature 1 is enabled</div>);
  }
  return (<div>Feature 1 is disabled</div>);
});

export default Feature1;
