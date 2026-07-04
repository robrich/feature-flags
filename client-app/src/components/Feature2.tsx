import { memo } from 'react';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';


const Feature2 = memo(function ({ name }: { name?: string }) {
  const { flags, refresh } = useFeatureFlags();

  return (
    <>
      <h2>Feature2</h2>
      {flags.loading
        ? (<div>Loading feature flags...</div>)
        : flags.error ? (<div>Error fetching feature flags: {flags.error}</div>)
        : flags.data?.TWO
        ? (<div>Feature 2 is enabled</div>)
        : (<div>Feature 2 is disabled</div>)
      }
      <button onClick={() => refresh(name)}>Refresh feature flags</button>
    </>
  );
});

export default Feature2;
