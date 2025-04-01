namespace FeatureFlagSplitio.Controllers;

[ApiController]
[Route("features")]
public class FeaturesController(IFeatureFlagRepository featureFlagRepository) : ControllerBase
{

	[HttpGet("feature1")]
	public ActionResult Feature1()
    {
        bool feature2 = featureFlagRepository.FeatureIsEnabled(FeatureFlags.ONE, defaultValue: false);
        if (feature2)
        {
            return Ok(new { Message = "Feature 1 is enabled" });
        }
        else
        {
            return Ok(new { Message = "Feature 1 is disabled" });
        }
	}

	[HttpGet("feature2")]
	public ActionResult Feature2()
	{
		bool feature2 = featureFlagRepository.FeatureIsEnabled(FeatureFlags.TWO, defaultValue: false);
		if (feature2)
		{
			return Ok(new { Message = "Feature 2 returns json when enabled" });
		}
		else
		{
			return Ok("Feature 2 returns text when disabled");
		}
	}

    [HttpGet("feature3")]
    public ActionResult Feature3()
    {
        return Ok(new { Feature3 = featureFlagRepository.FeatureIsEnabled(FeatureFlags.THREE, defaultValue: false) });
    }

    [HttpGet("all")]
	public ActionResult All()
	{
        return Ok(featureFlagRepository.GetAllFeatureFlags());
	}

}
