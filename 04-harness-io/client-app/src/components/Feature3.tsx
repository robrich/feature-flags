import { memo } from 'react';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';


const Feature3 = memo(function () {
  const { flags } = useFeatureFlags();

  return (
    <>
      <h2>Feature3</h2>
      {/* show the old way on error or loading */}
      {flags.data?.THREE
        ? (
          <div>
            <p>Welcome to the beta channel!</p>
            <img className="flag" src="/ca.svg" />
          </div>
        )
        : (<div><img className="flag" src="/ca-ontario.svg" /></div>)
      }
    </>
  );
});

export default Feature3;
