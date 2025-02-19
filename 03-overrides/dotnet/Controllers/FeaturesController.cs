namespace FeatureFlagWithOverrides.Controllers;

[ApiController]
[Route("features")]
public class FeaturesController(IFeatureFlagRepository featureFlagRepository) : ControllerBase
{

	[HttpGet("feature1")]
	public ActionResult Feature1(string? name)
    {
        bool feature2 = featureFlagRepository.FeatureIsEnabled(FeatureFlags.ONE, name);
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
	public ActionResult Feature2(string? name)
	{
		bool feature2 = featureFlagRepository.FeatureIsEnabled(FeatureFlags.TWO, name);
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
    public ActionResult Feature3(string? name)
    {
        return Ok(new { Feature3 = featureFlagRepository.FeatureIsEnabled(FeatureFlags.THREE, name) });
    }

    [HttpGet("all")]
	public ActionResult All(string? name)
	{
        return Ok(featureFlagRepository.GetAllFeatureFlags(name));
	}

}
