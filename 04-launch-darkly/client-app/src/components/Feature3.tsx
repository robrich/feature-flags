import { memo } from 'react';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';


const Feature2 = memo(function () {
  const { flags } = useFeatureFlags();

  return (
    <>
      <h2>Feature3</h2>
      {/* show the old way on error or loading */}
      {flags.data?.THREE
        ? (
          <div>
            <p>Welcome to the beta channel!</p>
            <img src="/vite.svg" />
          </div>
        )
        : (<div><img src="/react.svg" /></div>)
      }
    </>
  );
});

export default Feature2;
