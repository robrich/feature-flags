namespace FeatureFlagAzureAppConfig.Controllers;

[ApiController]
[Route("features")]
public class FeaturesController(IFeatureFlagRepository featureFlagRepository) : ControllerBase
{

	[HttpGet("feature1")]
	public async Task<ActionResult> Feature1()
    {
        bool feature2 = await featureFlagRepository.FeatureIsEnabled(FeatureFlags.ONE);
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
	public async Task<ActionResult> Feature2()
	{
		bool feature2 = await featureFlagRepository.FeatureIsEnabled(FeatureFlags.TWO);
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
    public async Task<ActionResult> Feature3()
    {
        return Ok(new { Feature3 = await featureFlagRepository.FeatureIsEnabled(FeatureFlags.THREE) });
    }

    [HttpGet("all")]
	public async Task<ActionResult> All()
	{
        return Ok(await featureFlagRepository.GetAllFeatureFlags());
	}

}
